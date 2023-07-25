"use client";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin, {
  DateClickArg,
  EventDragStartArg,
} from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import {
  calendarEventsAtom,
  useCreateEventMutation,
  useDeleteEventMutation,
  useModifyEventMutation,
} from "@/api/events";
import { EventClickArg } from "@fullcalendar/core";
import { ModalNewEvent, NewEvent } from "./ModalNewEvent";
import { ModalDelete } from "./ModalDelete";
interface DayCalendarProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}
export function DayCalendar({ currentDate, onDateChange }: DayCalendarProps) {
  const calendarRef = useRef<FullCalendar>(null);
  useEffect(() => {
    calendarRef.current?.getApi().gotoDate(currentDate);
  }, [currentDate]);
  const [newEventDate, setNewEventDate] = useState<Date | null>(null);
  const [toDeleteId, setToDeleteId] = useState<number | null>(null);
  const [events] = useAtom(calendarEventsAtom);
  const addEvents = useCreateEventMutation();
  const modifyEvents = useModifyEventMutation();
  const deleteEvents = useDeleteEventMutation();
  function handleClickDate(data: NewEvent | null) {
    setNewEventDate(null);
    if (data == null) return;
    const { description, duration } = data;
    addEvents.mutate({
      from: newEventDate!,
      to: dayjs(newEventDate!).add(duration, "hour").toDate(),
      description,
    });
  }
  function handleModifyEvent({ event }: EventDragStartArg) {
    console.log({ s: event.start, e: event.end });
    if (event.start && event.end) {
      modifyEvents.mutate({
        description: event.title,
        from: event.start,
        to: event.end,
        id: parseInt(event.id),
      });
    }
  }
  function handleDeleteEvent(wasConfirmed: boolean) {
    if (wasConfirmed) {
      deleteEvents.mutate({
        id: toDeleteId!,
      });
    }
    setToDeleteId(null);
  }
  function handleClickEvent(event: EventClickArg) {
    if (event.jsEvent.shiftKey) {
      setToDeleteId(parseInt(event.event.id));
    }
  }
  return (
    <>
      <FullCalendar
        ref={calendarRef}
        plugins={[timeGridPlugin, interactionPlugin]}
        editable
        height="auto"
        initialView="timeGridDay"
        events={events}
        eventResize={handleModifyEvent}
        eventDrop={handleModifyEvent}
        dateClick={(e) => setNewEventDate(e.date)}
        datesSet={(arg) => {
          if (arg.start.getTime() !== currentDate.getTime())
            onDateChange(arg.start);
        }}
        eventClick={handleClickEvent}
      />
      <ModalNewEvent
        open={newEventDate != null}
        date={newEventDate}
        onClose={handleClickDate}
      />
      <ModalDelete open={toDeleteId != null} onClose={handleDeleteEvent} />
    </>
  );
}
