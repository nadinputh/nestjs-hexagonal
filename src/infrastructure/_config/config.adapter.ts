import { Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

export class CronRefreshOptions {
  isRefresh: boolean = false;
  name?: string = 'refreshing_config';
  time?: string = '0 */10 * * * *';
}

/**
 * Default Cron Options
 */
const defaultCronOptions: CronRefreshOptions = new CronRefreshOptions();

export abstract class ConfigAdapter implements OnModuleInit, OnModuleDestroy {
  private readonly logger: Logger = new Logger(ConfigAdapter.name);
  private options: CronRefreshOptions;
  constructor() {}

  /**
   * In order to enabled reloading config, override this method;
   *
   * Default: Disabled
   */
  refresh(): CronRefreshOptions {
    return new CronRefreshOptions();
  }

  /**
   * To set the loaded configuration and also configurable of reloading config
   */
  abstract readonly config: ConfigService;

  /**
   * To add cron job for reloading config;
   *
   * Required for Reloading the configuration.
   */
  readonly scheduler?: SchedulerRegistry;

  /**
   * Define name of the loaded configuration;
   */
  abstract readonly name: string;

  /**
   * To load the configuration with entended implementation;
   */
  abstract load(): Promise<Record<string, any>> | Record<string, any>;

  /**
   * Delete a Job of Refreshing Configuration just before Nest destroys the host module;
   */
  onModuleDestroy() {
    if (
      this.options.isRefresh &&
      !!this.scheduler &&
      this.scheduler.doesExist('cron', this.options.name)
    ) {
      this.scheduler.deleteCronJob(this.options.name);
    }
  }

  /**
   * Load Configuration once the host module has been initialized; and also able to start a reload job
   * with a specific CRON TIME.
   */
  onModuleInit() {
    /**
     * First Load Configuration once the host module has been initialized
     */
    this.config.set(this.name, this.load());

    /**
     * Cron Options with Default if not provided
     */
    this.options = {
      ...defaultCronOptions,
      ...this.refresh(),
    };
    // Refreshing Configuration with CRON_TIME provided
    this.logger.debug(
      `Refreshing Dynamic Configuration is ${this.options.isRefresh && !!this.scheduler ? 'Enabled' : 'Disabled'}`,
    );

    if (
      this.options.isRefresh &&
      !!this.scheduler &&
      !this.scheduler.doesExist('cron', this.options.name)
    ) {
      // Implementation of Add new Job of Refreshing Configuration;
      const job = new CronJob(this.options.time, () => {
        this.logger.verbose(
          `last reloaded: ${this.scheduler.getCronJob(this.options.name).lastDate()}`,
        );
        // Reload Configuration
        this.config.set(this.name, this.load());
      }) as any;

      this.scheduler.addCronJob(this.options.name, job);
      job.start();

      this.logger.log(
        `job ${this.options.name} added for time (${this.options.time})!`,
      );
    }
  }
}
