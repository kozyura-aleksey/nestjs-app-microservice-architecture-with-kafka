import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Crud API')
    .setVersion('1.0')
    .build();
  app.enableCors();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api-docs', app, document);
  await app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
}
bootstrap();
