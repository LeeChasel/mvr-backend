import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logging.interceptor';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CharacterModule } from './character/character.module';

const envConfig = ConfigModule.forRoot({
  isGlobal: true,
  cache: true,
});

const loggingConfig = {
  provide: APP_INTERCEPTOR,
  useClass: LoggingInterceptor,
};

@Module({
  imports: [envConfig, UserModule, AuthModule, CharacterModule],
  providers: [loggingConfig],
})
export class AppModule {}
