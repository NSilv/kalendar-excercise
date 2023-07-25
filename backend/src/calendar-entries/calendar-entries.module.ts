import { Module } from '@nestjs/common';
import { CalendarEntriesService } from './calendar-entries.service';
import { CalendarEntriesController } from './calendar-entries.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CalendarEntriesController],
  providers: [CalendarEntriesService, PrismaService],
})
export class CalendarEntriesModule {}
