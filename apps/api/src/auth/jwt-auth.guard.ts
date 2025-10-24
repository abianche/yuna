import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<TUser = { id: string; email: string; name: string }>(
    err: Error | null,
    user: TUser | false,
  ) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
