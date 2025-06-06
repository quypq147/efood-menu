import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context) {
    if (err || !user) {
        console.log("JWT_SECRET:", process.env.JWT_SECRET);
      console.error("JWT xác thực thất bại:", err, info);
      throw err || new UnauthorizedException(info?.message || "Unauthorized");
    }
    return user;
  }
}