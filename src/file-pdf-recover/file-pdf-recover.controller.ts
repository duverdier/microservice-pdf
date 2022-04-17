import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FilePdfRecoverService } from './file-pdf-recover.service';
import { CreateFilePdfRecoverDto } from './dto/create-file-pdf-recover.dto';
import { UpdateFilePdfRecoverDto } from './dto/update-file-pdf-recover.dto';

@Controller('file-pdf-recover')
export class FilePdfRecoverController {
  constructor(private readonly filePdfRecoverService: FilePdfRecoverService) {}

  @Post()
  create(@Body() createFilePdfRecoverDto: CreateFilePdfRecoverDto) {
    return this.filePdfRecoverService.create(createFilePdfRecoverDto);
  }

  @Get()
  async findOne() {
    return await this.filePdfRecoverService.findOne();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFilePdfRecoverDto: UpdateFilePdfRecoverDto,
  ) {
    return this.filePdfRecoverService.update(+id, updateFilePdfRecoverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filePdfRecoverService.remove(+id);
  }
}
