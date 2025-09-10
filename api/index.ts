// api/index.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import type { IncomingMessage, ServerResponse } from 'http';

let cachedServer: any = null;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init(); // required for serverless
  return app.getHttpAdapter().getInstance();
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }
  cachedServer(req, res);
}
