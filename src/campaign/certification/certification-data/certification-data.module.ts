import { Module } from '@nestjs/common';
import { CertificationDataService } from './certification-data.service';
import { CertificationDataController } from './certification-data.controller';
import { PrismaService } from '../../../lib/prisma/prisma.service';

@Module({
  providers: [CertificationDataService, PrismaService],
  controllers: [CertificationDataController],
})
export class CertificationDataModule {}
