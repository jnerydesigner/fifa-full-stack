import { NestFactory } from '@nestjs/core';
import { AppModule } from './infra/modules/app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  const config = new ConfigService();
  const PORT = Number(config.get('SERVER_PORT')) || 3000;
  const logger = new Logger();
  await app.listen(PORT, () => {
    logger.log(`Server running on http://localhost:${PORT}`);
  });
}
bootstrap();
