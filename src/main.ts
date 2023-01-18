import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  const logger = new Logger('MainTS');

  try {

    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.SERVER_PORT);

  } catch (error) {

    logger.error('서버를 열거나 DB에 접근하는데 있어 오류가 발생했습니다.');
    logger.error(error);

  }

}
bootstrap(); 
