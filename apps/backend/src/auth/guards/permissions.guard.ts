// src/auth/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissonGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const [req] = context.getArgs();
    const userPermissions = req?.user?.permissions || [];
    const requiredPermissions = this.reflector.get('permissions', context.getHandler()) || [];
    const hasAllPermissions = requiredPermissions.every((permission) => userPermissions.includes(permission));

    if(requiredPermissions.length === 0 ||hasAllPermissions) {
      return true
    }
    throw new ForbiddenException('Insufficient Permissions');
  }
}
