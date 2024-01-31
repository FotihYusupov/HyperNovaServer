import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { StaticModule } from './static.module';
import { JwtModule } from '@nestjs/jwt';
import { TranslationModule } from './translations/translation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    StaticModule,
    TranslationModule,
  ],
})
export class AppModule {}
