import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from './users.service';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './enums/role.enum';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly userService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authToken = request.headers.authorization?.replace('Bearer', '').trim();

    if (!authToken) {
      return false;
    }

    const decodedToken = jwtDecode(authToken) as any;

    if (!decodedToken.email) {
      return false;
    }

    const userFromDb = await this.userService.findOne(decodedToken.email);

    if (userFromDb && requiredRoles.some(role => userFromDb.roles.includes(role))) {
      return true;
    } else {
      return false;
    }
  }
}
