import { Module } from '@nestjs/common';
import { KeywordBaseInnovativeService } from './keywordbase-innovative.service';
import { KeywordBaseInnovativeController } from './keywordbase-innovative.controller';
import { PrismaService } from '../lib/prisma/prisma.service';

@Module({
  controllers: [KeywordBaseInnovativeController],
  providers: [KeywordBaseInnovativeService, PrismaService],
})
export class KeywordBaseInnovativeModule {}
