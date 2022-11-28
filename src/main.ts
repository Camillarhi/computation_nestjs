import { config } from 'dotenv';
config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ["http://localhost:3000", "http://localhost:3001", "https://computate.netlify.app"],
    credentials: true

  });

  const config = new DocumentBuilder()
    .setTitle('Computation')
    .setDescription('Computation API')
    .setVersion('1.0')
    .addBearerAuth()
    // .addTag('GetBlack')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
  await app.listen(process.env.PORT || 7000);
}
bootstrap();
