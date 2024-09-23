import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { json, urlencoded } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const nestApp = await NestFactory.create<NestExpressApplication>(AppModule);
  nestApp.enableCors();
  nestApp.use(json({ limit: '50mb' }));
  nestApp.use(
    urlencoded({
      limit: '50mb',
      extended: false,
    }),
  );
  nestApp.useStaticAssets('resource', { prefix: '/' });
  nestApp.listen(3000).then(() => {
    Logger.log(
      `服务已经启动,接口请访问:http://wwww.localhost:${3000}`,
      'NestApplication',
    );
  });
}
bootstrap();
