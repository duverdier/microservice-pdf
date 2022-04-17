import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Paths } from '../queries/models';
import { UpdateSavePathDto } from './dto/update-save-path.dto';
import { SavePathRepository } from './save-path.repository';

@Injectable()
export class SavePathService {
  private logger = new Logger(SavePathService.name);
  constructor(private savePathRepository: SavePathRepository) {}
  async bulkCreate(paths: Paths[]) {
    try {
      console.log('bulkCreate paths', paths);
      const pathsCreate = await this.savePathRepository.bulkCreate(paths);
      this.logger.error({
        message: '-- Good --',
      });
      return pathsCreate;
    } catch (e) {
      this.logger.error({
        message: 'Something went wrong',
        errors: e,
      });
      throw new HttpException(e.message, e.status);
    }
  }

  findAll() {
    return `This action returns all savePath`;
  }

  findOne(id: number) {
    return `This action returns a #${id} savePath`;
  }

  update(id: number, updateSavePathDto: UpdateSavePathDto) {
    return `This action updates a #${id} savePath`;
  }

  remove(id: number) {
    return `This action removes a #${id} savePath`;
  }
}
