import { Injectable } from '@nestjs/common';
import { CreateCalendarEntryDto } from './dto/create-calendar-entry.dto';
import { UpdateCalendarEntryDto } from './dto/update-calendar-entry.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CalendarEntriesService {
  constructor(private prisma: PrismaService) {}
  create(createCalendarEntryDto: CreateCalendarEntryDto) {
    return 'This action adds a new calendarEntry';
  }

  async findAll() {
    return await this.prisma.calendarEntry.findMany();
    // return `This action returns all calendarEntries`;
  }

  async findOne(id: number) {
    return await this.prisma.calendarEntry.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateCalendarEntryDto: UpdateCalendarEntryDto) {
    return await this.prisma.calendarEntry.update({
      where: { id },
      data: updateCalendarEntryDto,
    });
  }

  async remove(id: number) {
    return `This action removes a #${id} calendarEntry`;
  }
}
