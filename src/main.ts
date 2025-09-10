import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

let cachedServer: any = null;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });
  await app.init();
  return app.getHttpAdapter().getInstance();
}

export default async function handler(req: any, res: any) {
  try {
    if (!cachedServer) {
      cachedServer = await bootstrap();
    }
    cachedServer(req, res);
  } catch (err) {
    console.error('Serverless function crashed:', err);
    res.status(500).json({ error: 'Serverless function crashed', details: err.message });
  }
}
