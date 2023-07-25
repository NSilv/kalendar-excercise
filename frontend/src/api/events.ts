import { fetchSafe } from "@/utils/http";
import {
  CalendarEntries,
  CreateRequest,
  CalendarEntry,
  UpdateRequest,
  RemoveRequest,
} from "models/src/calendar-entry";
import {
  QueryObserverOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { atom, useAtom } from "jotai";
import { atomsWithQuery } from "jotai-tanstack-query";
import { Calendar } from "@fullcalendar/core";

async function getEvents(): Promise<CalendarEntries> {
  console.log("getting");
  const events = await fetchSafe(CalendarEntries, "calendar-entries", {
    method: "GET",
  });
  return events;
}

async function createEvent(body: CreateRequest) {
  console.log("creating");
  return fetchSafe(CalendarEntry, "calendar-entries", {
    method: "POST",
    body,
  });
}

async function modifyEvent(id: number, body: UpdateRequest) {
  return fetchSafe(null, `calendar-entries/${id}`, {
    method: "PATCH",
    body,
  });
}

async function removeEvent(body: RemoveRequest) {
  return fetchSafe(null, "calendar-entries", {
    method: "DELETE",
    body,
  });
}

const EVENTS_KEY = ["events"];

const getEventsQuery: QueryObserverOptions<CalendarEntries> = {
  queryKey: EVENTS_KEY,
  queryFn: getEvents,
};

export const [eventsAtom] = atomsWithQuery((_) => getEventsQuery);

export function useCreateEventMutation() {
  const queryClient = useQueryClient();
  return useMutation(createEvent, {
    onMutate: async (data) => {
      await queryClient.cancelQueries(EVENTS_KEY);
      queryClient.setQueryData<CalendarEntries>(EVENTS_KEY, (previous) => [
        ...(previous ?? []),
        { ...data, id: 25000 },
      ]);
    },
    onSuccess: (data) => {
      console.log("invalidating");
      queryClient.invalidateQueries(EVENTS_KEY);
    },
  });
}
export function useModifyEventMutation() {
  const queryClient = useQueryClient();
  return useMutation(
    (data: UpdateRequest & { id: number }) => modifyEvent(data.id, data),
    {
      onMutate: async (data) => {
        await queryClient.cancelQueries(EVENTS_KEY);
        queryClient.setQueryData<CalendarEntries>(EVENTS_KEY, (previous) => {
          if (!previous) return previous;
          const idx = previous.findIndex((x) => x.id === data.id);
          if (idx === -1) return previous;
          previous[idx] = data;
        });
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries(EVENTS_KEY);
      },
    }
  );
}
export function useDeleteEventMutation() {
  const queryClient = useQueryClient();
  return useMutation(removeEvent, {
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries(EVENTS_KEY);
      queryClient.setQueryData<CalendarEntries>(EVENTS_KEY, (previous) =>
        previous?.filter((x) => x.id !== id)
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(EVENTS_KEY);
    },
  });
}
export const calendarEventsAtom = atom(async (get) => {
  const events = await get(eventsAtom);
  return events.map((e) => ({
    start: e.from,
    end: e.to,
    title: e.description,
    id: e.id.toString(),
    editable: true,
  }));
});
