import { Test, TestingModule } from '@nestjs/testing';
import { CalendarEntriesController } from './calendar-entries.controller';
import { CalendarEntriesService } from './calendar-entries.service';

describe('CalendarEntriesController', () => {
  let controller: CalendarEntriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalendarEntriesController],
      providers: [CalendarEntriesService],
    }).compile();

    controller = module.get<CalendarEntriesController>(CalendarEntriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
