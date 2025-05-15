import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService,private reflector:Reflector) {}
  async canActivate(context: ExecutionContext ): Promise<boolean> {
    const handler=context.getHandler()
    const chesc=this.reflector.get('is_public',handler)
    const request = context.switchToHttp().getRequest();
    const { token } = request.cookies;
    if(chesc) return true
    if(token){
      try {
        await this.jwtService.verifyAsync(token);
        return true;
      } catch (error) {
        throw new HttpException('token invalid', 401);
      }
    }
    return false
  }
}
