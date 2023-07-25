"use client";
import styles from "./page.module.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { NavigationCalendar } from "./NavigationCalendar";
import { DayCalendar } from "./DayCalendar";
import { useEffect, useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useHydrateAtoms } from "jotai/react/utils";
import { Provider } from "jotai";
import { queryClientAtom } from "jotai-tanstack-query";
import {
  Box,
  Container,
  CssBaseline,
  Drawer,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});
const HydrateAtoms = ({ children }: React.PropsWithChildren<{}>) => {
  useHydrateAtoms([[queryClientAtom, client]]);
  return children;
};
const drawerWidth = 320;
export default function Home() {
  const [currentDate, setCurrentDate] = useState(
    dayjs(Date.now()).startOf("day")
  );
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  return (
    <QueryClientProvider client={client}>
      <Provider>
        <HydrateAtoms>
          <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <Box
                component={"nav"}
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
              >
                <Drawer
                  variant={"permanent"}
                  ModalProps={{ keepMounted: true }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <NavigationCalendar
                      currentDate={currentDate}
                      onDateChange={setCurrentDate}
                    />
                  </LocalizationProvider>
                </Drawer>
              </Box>
              <Box
                component={"main"}
                sx={{
                  flexGrow: 1,
                  p: 3,
                  width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
              >
                <DayCalendar
                  currentDate={currentDate.toDate()}
                  onDateChange={(date) => setCurrentDate(dayjs(date))}
                />
              </Box>
            </Box>
          </ThemeProvider>
        </HydrateAtoms>
      </Provider>
    </QueryClientProvider>
  );
}
