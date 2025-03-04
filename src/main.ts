import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    exceptionFactory: (errors: ValidationError[]) => {
      const formattedErrors = errors
        .filter(err => err.constraints) 
        .map(err => ({
          field: err.property,
          errors: Object.values(err.constraints || {}) 
        }));

      return new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: formattedErrors
      });
    }
  }));

  await app.listen(3000);
}
bootstrap();
