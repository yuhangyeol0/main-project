import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

interface IOAuthUser {
  user: Pick<User, 'email' | 'password' | 'name' | 'age'>;
}

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async loginSocial(res, req) {
    let user = await this.userService.findOne({ email: req.user.email });
    if (!user) {
      const { password, ...rest } = req.user;
      const createUser = { ...rest, hashedPassword: password };
      user = await this.userService.create({ ...createUser });
    }
    return user;
  }

  @Get('/login/google/callback')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    const user = this.loginSocial(res, req);
    this.authService.setRefreshToken({ user, res });
    res.redirect(
      'http://localhost:5500/frontend/login/index.html',
    );
  }
  @Get('/login/naver/callback')
  @UseGuards(AuthGuard('naver'))
  async loginNaver(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    const user = this.loginSocial(res, req);
    this.authService.setRefreshToken({ user, res });
    res.redirect(
      'http://localhost:5500/frontend/login/index.html',
    );
  }

  @Get('/login/kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async loginKakao(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    const user = this.loginSocial(res, req);
    this.authService.setRefreshToken({ user, res });
    res.redirect(
      'http://localhost:5500/frontend/login/index.html',
    );
  }
}
