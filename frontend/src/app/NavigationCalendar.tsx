"use client";

import { eventsAtom } from "@/api/events";
import FullCalendar from "@fullcalendar/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { Dayjs } from "dayjs";
import { useAtom } from "jotai";

interface NavigationCalendarProps {
  currentDate: Dayjs;
  onDateChange: (date: Dayjs) => void;
}
export function NavigationCalendar({
  currentDate,
  onDateChange,
}: NavigationCalendarProps) {
  const [events] = useAtom(eventsAtom);
  return (
    <StaticDatePicker
      value={currentDate}
      onChange={(value) => {
        if (value) onDateChange(value);
      }}
    />
  );
}
