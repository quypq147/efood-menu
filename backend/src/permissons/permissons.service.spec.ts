import { Test, TestingModule } from '@nestjs/testing';
import { PermissonsService } from './permissons.service';

describe('PermissonsService', () => {
  let service: PermissonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissonsService],
    }).compile();

    service = module.get<PermissonsService>(PermissonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
