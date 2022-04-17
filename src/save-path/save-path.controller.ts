import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SavePathService } from './save-path.service';
import { CreateSavePathDto } from './dto/create-save-path.dto';
import { UpdateSavePathDto } from './dto/update-save-path.dto';

@Controller('save-path')
export class SavePathController {
  constructor(private readonly savePathService: SavePathService) {}

  @Get()
  findAll() {
    return this.savePathService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.savePathService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSavePathDto: UpdateSavePathDto,
  ) {
    return this.savePathService.update(+id, updateSavePathDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.savePathService.remove(+id);
  }
}
