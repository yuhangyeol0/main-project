import { Controller, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtRefreshStrategy } from "src/common/auth/jwt-refresh.strategy";
import { JwtGoogleStrategy } from "src/common/auth/jwt-social-google.strategy";
import { JwtKakaoStrategy } from "src/common/auth/jwt-social-kakao.strategy";
import { JwtNaverStrategy } from "src/common/auth/jwt-social-naver.strategy";
import { IamportService } from "../iamport/iamport.service";
import { User } from "../user/entities/user.entity";
import { UserService } from "../user/user.service";
import { AuthController } from "./auth.controller";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";

@Module({imports:[TypeOrmModule.forFeature([User]), JwtModule.register({})], 
        providers:[AuthResolver,AuthService, UserService,AuthModule,JwtRefreshStrategy,JwtGoogleStrategy,JwtNaverStrategy,JwtKakaoStrategy,IamportService],
        controllers:[AuthController],})
export class AuthModule{}
