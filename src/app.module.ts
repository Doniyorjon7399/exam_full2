import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Configuration from './config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { MovieModule } from './modules/movie/movie.module';
import { CategoryModule } from './modules/category/category.module';
import { UserProfileModule } from './modules/user-profile/user-profile.module';
import { AuthModule } from './modules/auth/auth.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { FavoritesMoviesModule } from './modules/favorites-movies/favorites-movies.module';
import { CommentsModule } from './modules/comments/comments.module';
import { AdminProfileModule } from './modules/admin-profile/admin-profile.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './common/guards/auth.guard';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: Configuration,
      envFilePath: '.env',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return configService.get('jwt_config') as JwtModuleOptions;
      },
      inject: [ConfigService],
    }),
    MovieModule,
    CategoryModule,
    UserProfileModule,
    AuthModule,
    SubscriptionModule,
    FavoritesMoviesModule,
    CommentsModule,
    AdminProfileModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
