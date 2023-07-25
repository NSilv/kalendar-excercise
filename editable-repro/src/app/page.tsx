"use client";
import Image from "next/image";
import styles from "./page.module.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
const now = new Date();
const now1hr = new Date();
now1hr.setHours(now.getHours() + 1);
export default function Home() {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      editable
      aspectRatio={1}
      contentHeight="auto"
      initialView="timeGridDay"
      events={[
        {
          id: "1",
          start: now,
          end: now1hr,
          title: "test",
        },
      ]}
    />
  );
}
