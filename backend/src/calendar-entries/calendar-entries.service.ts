import { Injectable, Logger } from '@nestjs/common';
import * as model from '@models/calendar-entry';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CalendarEntriesService {
  private readonly logger = new Logger(CalendarEntriesService.name);
  constructor(private prisma: PrismaService) {}

  async create(data: model.CreateRequest): Promise<model.CalendarEntry> {
    this.logger.debug('data: ', JSON.stringify(data));
    return await this.prisma.calendarEntry.create({
      data,
    });
  }

  async findAll(): Promise<model.CalendarEntries> {
    return await this.prisma.calendarEntry.findMany();
    // return `This action returns all calendarEntries`;
  }

  async findOne(id: number): Promise<model.CalendarEntry | null> {
    const entry = await this.prisma.calendarEntry.findUnique({
      where: {
        id,
      },
    });
    return entry;
  }

  async update(id: number, data: model.UpdateRequest) {
    return await this.prisma.calendarEntry.update({
      where: { id },
      data,
    });
  }

  async remove({ id }: model.RemoveRequest) {
    await this.prisma.calendarEntry.delete({ where: { id } });
  }
}
