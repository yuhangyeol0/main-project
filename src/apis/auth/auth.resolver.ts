import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import {
  UnauthorizedException,
  UseGuards,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';
import {
  GqlAuthAccessGuard,
  GqlAuthRefreshGuard,
} from 'src/common/auth/gql-auth.guard';
import { JwtAccessStrategy } from 'src/common/auth/jwt-access.strategy';
import * as jwt from 'jsonwebtoken';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) //
    private readonly cacheManager: Cache,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() context: any,
  ) {
    const user = await this.userService.findOne({ email });
    const isAuth = bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnauthorizedException('비밀번호가 틀립니다');

    this.authService.setRefreshToken({ user, res: context.res });

    return this.authService.getAccessToken({ user });
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  restoreAccessToken(
    //refreshToken검증
    @CurrentUser() currentuser: ICurrentUser,
  ) {
    return this.authService.getAccessToken({ user: currentuser });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async logout(@Context() context: any): Promise<string> {
    const re_Token = context.req.headers.cookie.replace('refreshToken=', '');
    const ac_Token = context.req.headers.authorization.split(' ')[1];
    const time = Math.floor(Date.now() / 1000);
    try {
      jwt.verify(ac_Token, process.env.ACC_TOKEN, async (err, payload) => {
        const pay = payload.exp - time;
        await this.cacheManager.set(`accessToken:${ac_Token}`, ac_Token, {
          ttl: pay,
        });
      });
    } catch (err) {
      throw new UnauthorizedException();
    }

    try {
      jwt.verify(re_Token, process.env.REF_TOKEN, async (err, payload) => {
        const pay = payload.exp - time;
        await this.cacheManager.set(`refreshToken:${re_Token}`, re_Token, {
          ttl: pay,
        });
      });
    } catch (err) {
      throw new UnauthorizedException(err);
    }
    // console.log(context.req.headers.cookie, context.req.headers.authorization);
    return '로그아웃에 성공했습니다.';
  }
}
