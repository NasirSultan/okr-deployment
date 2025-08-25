import { PartialType } from '@nestjs/mapped-types';
import { CreateKeywordBaseInnovativeDto } from './create-keywordbase-innovative.dto';

export class UpdateKeywordBaseInnovativeDto extends PartialType(CreateKeywordBaseInnovativeDto) {}
