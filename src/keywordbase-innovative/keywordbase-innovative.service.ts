import { Injectable, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../lib/prisma/prisma.service'
import { CreateKeywordBaseInnovativeDto } from './dto/create-keywordbase-innovative.dto'
import { UpdateKeywordBaseInnovativeDto } from './dto/update-keywordbase-innovative.dto'
import { AddThirdInnovativeDto } from './dto/add-third-innovative.dto'

@Injectable()
export class KeywordBaseInnovativeService {
  constructor(private prisma: PrismaService) {}


  async create(data: CreateKeywordBaseInnovativeDto) {
    const createData = {
      strategyId: data.strategyid,
      keyResult: data.keyresult,
      firstInnovative: data.firstinnovative,
      secondInnovative: data.secondinnovative,
    }


    const existing = await this.prisma.keywordBaseInnovative.findFirst({
      where: { strategyId: data.strategyid },
    })

    if (existing) {
      await this.prisma.keywordBaseInnovative.delete({
        where: { id: existing.id },
      })
    }

    return this.prisma.keywordBaseInnovative.create({ data: createData })
  }

  findAll() {
    return this.prisma.keywordBaseInnovative.findMany()
  }

  findOne(id: number) {
    return this.prisma.keywordBaseInnovative.findUnique({ where: { id } })
  }

  update(id: number, data: UpdateKeywordBaseInnovativeDto) {
    const updateData: any = {}
    if (data.strategyid !== undefined) updateData.strategyId = data.strategyid
    if (data.keyresult !== undefined) updateData.keyResult = data.keyresult
    if (data.firstinnovative !== undefined) updateData.firstInnovative = data.firstinnovative
    if (data.secondinnovative !== undefined) updateData.secondInnovative = data.secondinnovative
    if (data.thirdinnovative !== undefined) updateData.thirdInnovative = data.thirdinnovative

    return this.prisma.keywordBaseInnovative.update({
      where: { id },
      data: updateData,
    })
  }

  remove(id: number) {
    return this.prisma.keywordBaseInnovative.delete({ where: { id } })
  }


  async addThirdInnovative(id: number, dto: AddThirdInnovativeDto) {
    const record = await this.prisma.keywordBaseInnovative.findUnique({ where: { id } })
    if (!record) throw new BadRequestException('Record not found')
    if (!record.firstInnovative || !record.secondInnovative) {
      throw new BadRequestException('First two innovatives must exist before adding third')
    }
    if (record.thirdInnovative) {
      throw new BadRequestException('Third innovative already exists')
    }

    return this.prisma.keywordBaseInnovative.update({
      where: { id },
      data: { thirdInnovative: dto.thirdinnovative },
    })
  }
}
