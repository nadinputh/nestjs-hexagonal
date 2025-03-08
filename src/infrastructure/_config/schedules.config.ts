import { registerAs } from '@nestjs/config';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { resolve } from 'path';

export const YAML_CONFIG_FILENAME = 'schedule.yaml';

export default (name: string) => {
  return registerAs(name, () => {
    return yaml.load(
      readFileSync(resolve(YAML_CONFIG_FILENAME), 'utf8'),
    ) as Record<string, any>;
  });
};

export interface ScheduleModel {
  enabled: boolean;
  name: string;
  cron: string;
  event?: string;
}
