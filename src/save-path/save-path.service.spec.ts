import { Test, TestingModule } from '@nestjs/testing';
import { SavePathService } from './save-path.service';

describe('SavePathService', () => {
  let service: SavePathService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SavePathService],
    }).compile();

    service = module.get<SavePathService>(SavePathService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
