// src/lib/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    if (!this._connected) {
      await this.$connect();
      this._connected = true;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  private _connected = false;
}
