import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "dotenv/config"
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.setGlobalPrefix("api")
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Yashnabod_MMTB.uz website')
    .setDescription('The yashnobod_mmtb.uz website API documentation')
    .setVersion('1.0')
    .addTag('default')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);
  const PORT = process.env.PORT || 3003
  await app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
}
bootstrap();
