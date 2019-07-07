import "reflect-metadata";

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PassportModule } from '@nestjs/passport';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { AllExceptionsFilter } from '@core/utils/exceptions.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as Ddos from 'ddos';
import { noop } from 'rxjs';

async function bootstrap() {
  PassportModule.register({ property: 'user' });

  const isDev = (process.env.NODE_ENV === 'development');
  const onDevServer = !process.env.DEV_DBHOST;

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());

  const K = 'Oops, Nothing Here :)';
  app.enable('trust proxy');
  app.use(compression());

  // DENY KNOWN REST API VULNERABILITIES
  app.use(helmet.hidePoweredBy({ setTo: 'PHP/5.3.2' }));
  app.use(helmet.frameguard({ action: 'deny' }));
  app.use(helmet.noSniff());

  // APPLICATION LAYER DDOS PROTECTION
  const ddos = new Ddos({ burst: 10, limit: 15 });
  process.env.NODE_ENV === 'production' ? app.use(ddos.express) : noop();

  // CRAWL DENIAL FOR SEARCH ENGINES
  app.use('/robots.txt', (requset: any, response: any) =>
    response.type('text/plain').send('User-agent: *\nDisallow: /'));

  // HEALTH CHECK URL @ index.html
  app.use('/index.html', (request: any, response: any) => response.send(K));

  // ADD SUPPORT FOR BODY/URL-ENCODED REST APIs
  app.use(bodyParser.urlencoded({ extended: true, limit: '8mb' }));
  app.use(bodyParser.json({ limit: '8mb' }));

  // MORGAN LOGGER
  app.use(morgan('dev'));

  const options = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
