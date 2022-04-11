import {
  Injectable,
  //   UnauthorizedException,
  //   CACHE_MANAGER,
  //   Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { Cache } from 'cache-manager';
// import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtsService: JwtService, // @Inject(CACHE_MANAGER) // private readonly cacheManager: Cache,
  ) {}
  getAccessToken({ user }) {
    const accessToken = this.jwtsService.sign(
      //토큰 발급
      { email: user.email, sub: user.id },
      { secret: process.env.ACC_TOKEN, expiresIn: '1h' },
    );
    return accessToken;
  }
  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtsService.sign(
      { email: user.email, sub: user.id },
      { secret: process.env.REF_TOKEN, expiresIn: '2w' },
    );
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);
  }
}
