import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CalendarEntriesModule } from './calendar-entries/calendar-entries.module';

@Module({
  imports: [ConfigModule.forRoot(), CalendarEntriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
