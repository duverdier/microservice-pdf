import { Test, TestingModule } from '@nestjs/testing';
import { SavePathController } from './save-path.controller';
import { SavePathService } from './save-path.service';

describe('SavePathController', () => {
  let controller: SavePathController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SavePathController],
      providers: [SavePathService],
    }).compile();

    controller = module.get<SavePathController>(SavePathController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
