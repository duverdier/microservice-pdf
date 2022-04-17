import { PartialType } from '@nestjs/mapped-types';
import { CreateSavePathDto } from './create-save-path.dto';

export class UpdateSavePathDto extends PartialType(CreateSavePathDto) {}
