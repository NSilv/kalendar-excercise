"use client";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
export function DayCalendar() {
  return (
    <FullCalendar
      plugins={[timeGridPlugin]}
      aspectRatio={1}
      contentHeight="auto"
      initialView="timeGridDay"
    />
  );
}
