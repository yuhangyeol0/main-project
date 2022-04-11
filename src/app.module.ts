import { Module, CacheModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './apis/auth/auth.module';
import { ProductModule } from './apis/product/product.module';
import { ProductSubCategoryModule } from './apis/subCategory/productSubCategory.module';
import { UserModule } from './apis/user/user.module';
import { JwtRefreshStrategy } from './common/auth/jwt-refresh.strategy';
import { JwtGoogleStrategy } from './common/auth/jwt-social-google.strategy';
import { JwtNaverStrategy } from './common/auth/jwt-social-naver.strategy';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver } from '@nestjs/apollo';
import { PointTransactionModule } from './apis/pointTransaction/pointTransaction.module';
import { JwtKakaoStrategy } from './common/auth/jwt-social-kakao.strategy';
import { IamportService } from './apis/iamport/iamport.service';
import { ImageModule } from './apis/image/image.module';
import { FileModule } from './apis/file/file.module';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [
    ImageModule,
    UserModule,
    ProductModule,
    PointTransactionModule,
    ProductSubCategoryModule,
    AuthModule,
    FileModule,
    ImageModule,
    JwtRefreshStrategy,
    JwtGoogleStrategy,
    JwtNaverStrategy,
    JwtKakaoStrategy,

    // ProductMainCategoryModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'src/common/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }), //
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'my_database',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'mainproject',
      entities: [__dirname + '/apis/**/*.entity.*'], //ts는 실제 실행될때 js로 저장됨
      synchronize: true,
      logging: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: 'redis://my_redis:6379',
      isGlobal: true,
    }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
