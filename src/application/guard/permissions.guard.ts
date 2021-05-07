import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorator/permissions.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  private readonly logger: Logger = new Logger('PermissionGuard');
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    this.logger.log(requiredPermissions);
    if (!requiredPermissions) {
      return true;
    }
    return true;
    //TODO: Check user's permissions
  }
}
