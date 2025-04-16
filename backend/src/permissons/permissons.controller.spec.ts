import { Test, TestingModule } from '@nestjs/testing';
import { PermissonsController } from './permissons.controller';

describe('PermissonsController', () => {
  let controller: PermissonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissonsController],
    }).compile();

    controller = module.get<PermissonsController>(PermissonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
