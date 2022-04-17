import { PartialType } from '@nestjs/mapped-types';
import { CreateFilePdfRecoverDto } from './create-file-pdf-recover.dto';

export class UpdateFilePdfRecoverDto extends PartialType(CreateFilePdfRecoverDto) {}
