import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CalendarEntriesService } from './calendar-entries.service';
import * as model from '@models/calendar-entry';
import {} from 'nestjs-zod';
@Controller('calendar-entries')
export class CalendarEntriesController {
  constructor(
    private readonly calendarEntriesService: CalendarEntriesService,
  ) {}

  @Post()
  async create(@Body() createCalendarEntryDto: model.CreateRequestDto) {
    return this.calendarEntriesService.create(createCalendarEntryDto);
  }

  @Get()
  async findAll(): Promise<model.CalendarEntriesDto> {
    return this.calendarEntriesService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<model.CalendarEntryDto | null> {
    return this.calendarEntriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCalendarEntryDto: model.UpdateRequestDto,
  ) {
    return this.calendarEntriesService.update(+id, updateCalendarEntryDto);
  }

  @Delete()
  remove(@Body() removeCalendarEntryDto: model.RemoveRequestDto) {
    return this.calendarEntriesService.remove(removeCalendarEntryDto);
  }
}
