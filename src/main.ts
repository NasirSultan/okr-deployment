import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

let cachedServer: any = null;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init(); // important for serverless
  return app.getHttpAdapter().getInstance();
}

// Vercel serverless handler
export default async function handler(req: any, res: any) {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }
  cachedServer(req, res);
}
