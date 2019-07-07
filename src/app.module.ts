import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouterModule } from 'nest-router';
import { routes } from './app.routes';
import { ConfigModule } from './@core/config/config.module';
import { ConfigService } from './@core/config/config.service';
import { UploadModule } from './upload/upload.module';
import { CoreModule } from '@core/core.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

const MongooseConfig = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    uri: configService.getEnv('MONGODB_URI'),
    useFindAndModify: false,
    useNewUrlParser: true,
  }),
};

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync(MongooseConfig),
    RouterModule.forRoutes(routes),
    CoreModule.forRoot(),
    UploadModule,
    AuthModule,

    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
