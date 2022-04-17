import { Inject, Injectable } from '@nestjs/common';
import { PATH_REPOSITORY } from 'src/queries/providers/path.provider';
import { Paths } from '../queries/models';

@Injectable()
export class SavePathRepository {
  constructor(
    @Inject(PATH_REPOSITORY)
    private savePathRepository: typeof Paths,
  ) {}

  async create(paths: Paths) {
    return await this.savePathRepository.create(paths);
  }
  async bulkCreate(paths: Paths[]) {
    return await this.savePathRepository.bulkCreate(paths);
  }
}
