import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";


@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    const [bearer, token] = authHeader.split(' ')

    if(bearer !== 'Bearer' || !token)
      throw new UnauthorizedException({message: 'User is not authorized'});

    req.user = this.jwtService.verify(token);
    return true;
  }
}