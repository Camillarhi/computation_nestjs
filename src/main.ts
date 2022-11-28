import { config } from 'dotenv';
config();
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    origin: ["http://localhost:3000", "https://get-black-project-delta.vercel.app"],
    credentials: true

  });
  await app.listen(7000);
}
bootstrap();
