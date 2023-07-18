import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"

export const CalendarEntryModel = z.object({
  id: z.number().int(),
  description: z.string(),
  from: z.date(),
  to: z.date(),
})

export class CalendarEntryDto extends createZodDto(CalendarEntryModel) {
}
