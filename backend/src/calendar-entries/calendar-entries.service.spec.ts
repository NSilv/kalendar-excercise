import { Test, TestingModule } from '@nestjs/testing';
import { CalendarEntriesService } from './calendar-entries.service';

describe('CalendarEntriesService', () => {
  let service: CalendarEntriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalendarEntriesService],
    }).compile();

    service = module.get<CalendarEntriesService>(CalendarEntriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
