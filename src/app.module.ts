import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { StaticModule } from './static.module';
import { JwtModule } from '@nestjs/jwt';
import { TranslationModule } from './translations/translation.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/useer.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { VacancyModule } from './vacancy/vacancy.module';
import { TeamModule } from './team/team.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '12h' },
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    StaticModule,
    TranslationModule,
    UserModule,
    PortfolioModule,
    VacancyModule,
    TeamModule,
    ClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
