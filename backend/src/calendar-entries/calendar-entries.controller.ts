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
import { CreateCalendarEntryDto } from './dto/create-calendar-entry.dto';
import { UpdateCalendarEntryDto } from './dto/update-calendar-entry.dto';

@Controller('calendar-entries')
export class CalendarEntriesController {
  constructor(
    private readonly calendarEntriesService: CalendarEntriesService,
  ) {}

  @Post()
  create(@Body() createCalendarEntryDto: CreateCalendarEntryDto) {
    return this.calendarEntriesService.create(createCalendarEntryDto);
  }

  @Get()
  findAll() {
    return this.calendarEntriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.calendarEntriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCalendarEntryDto: UpdateCalendarEntryDto,
  ) {
    return this.calendarEntriesService.update(+id, updateCalendarEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.calendarEntriesService.remove(+id);
  }
}
