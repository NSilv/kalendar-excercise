/**
 * Zod generation for models, shared between backend and frontend!
 * Models are automatically generated from prisma into the autogen folder, by nestjs-zod-prisma
 * then we use that "base" model to create more complex models in here (doing it in one file for the sake of brevity)
 * one for each input and output of controllers as needed. We can then use these to:
 * - validate that controllers are correctly implemented at least type wise
 * - use them in the
 */
import { createZodDto } from "nestjs-zod/dto";
import * as db from "./autogen/calendarentry";
import { z } from "nestjs-zod/z";

export const CreateRequest = db.CalendarEntryModel.omit({ id: true });
export type CreateRequest = z.infer<typeof CreateRequest>;
export class CreateRequestDto extends createZodDto(CreateRequest) {}

export const UpdateRequest = db.CalendarEntryModel.omit({ id: true });
export type UpdateRequest = z.infer<typeof UpdateRequest>;
export class UpdateRequestDto extends createZodDto(UpdateRequest) {}

export const RemoveRequest = db.CalendarEntryModel.pick({ id: true });
export type RemoveRequest = z.infer<typeof RemoveRequest>;
export class RemoveRequestDto extends createZodDto(RemoveRequest) {}

export const CalendarEntries = db.CalendarEntryModel.array();
export type CalendarEntries = z.infer<typeof CalendarEntries>;
export class CalendarEntriesDto extends createZodDto(CalendarEntries) {}

export const CalendarEntry = db.CalendarEntryModel;
export type CalendarEntry = z.infer<typeof CalendarEntry>;
export class CalendarEntryDto extends createZodDto(CalendarEntry) {}
