import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const userIdFromParam = parseInt(req.params.userId);
    const userIdFromToken = req.user.id;

    if(userIdFromToken === userIdFromParam)
      return true;

    throw new ForbiddenException({message: 'access denied'});
  }
}