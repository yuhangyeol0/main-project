import { Strategy, Profile } from 'passport-kakao';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_ID,
      clientSecret: process.env.KAKAO_SECRET,
      callbackURL: 'http://localhost:3000/login/kakao/callback',
      scope: ['account_email'],
    });
  }

  //검증끝나고 수행되는 부분
  validate(accessToken: string, refreshToken: string, profile: Profile) {
    // console.log(profile._json.kakao_account.email)
    return {
      email: profile._json.kakao_account.email,
      name: profile.displayName,
      password: profile.id,
      // age:0
    };
  }
}
