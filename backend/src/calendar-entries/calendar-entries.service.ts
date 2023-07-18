import { Injectable } from '@nestjs/common';
import * as model from '@models/calendar-entry';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CalendarEntriesService {
  constructor(private prisma: PrismaService) {}

  async create(data: model.CreateRequest) {
    return await this.prisma.calendarEntry.create({
      data,
    });
  }

  async findAll(): Promise<model.FindAllResponse> {
    return await this.prisma.calendarEntry.findMany();
    // return `This action returns all calendarEntries`;
  }

  async findOne(id: number): Promise<model.FindOneResponse | null> {
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
