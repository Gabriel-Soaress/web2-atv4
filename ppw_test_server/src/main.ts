import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,PUT,POST,DELETE,PATCH',
    allowedHeaders: 'Content-Type, Accept, Authorization, X-Requested-With',
    credentials: false,
  });

  const port = process.env.PORT ?? 8001;
  await app.listen(port);
  console.log(`Servidor NestJS Pratica rodando na porta ${port}: http://localhost:${port}`);
}
bootstrap();
