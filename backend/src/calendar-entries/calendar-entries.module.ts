import { Module } from '@nestjs/common';
import { CalendarEntriesService } from './calendar-entries.service';
import { CalendarEntriesController } from './calendar-entries.controller';

@Module({
  controllers: [CalendarEntriesController],
  providers: [CalendarEntriesService],
})
export class CalendarEntriesModule {}
