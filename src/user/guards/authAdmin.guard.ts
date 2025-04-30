import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt/dist/jwt.service";
@Injectable()
export class AuthAdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService,private readonly configService:ConfigService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
      // here must in request put the token in the header
    const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
        }
        
    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token is missing');
        }
        
    try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: this.configService.get<string>('JWT_SECRET'),
        });
       if (!payload.isAdmin) {
          throw new UnauthorizedException('You are not authorized to access this resource');
       }
        
      request['user'] = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}