import GoogleApi from "./GoogleApi";
import { Stack } from "@mui/material";
import Login from "./Login";
import { useState } from "react";
import ApiCalendar from "react-google-calendar-api";
import "./CalendarApp.css";

function App() {
  const [apiCalendar, setApiCalendar] = useState<ApiCalendar | undefined>(
    undefined
  );

  return (
    <Stack alignItems="center">
      <p className="title">GoogleカレンダーAPIサンプル</p>
      {apiCalendar ? (
        <GoogleApi apiCalendar={apiCalendar} />
      ) : (
        <Login setApiCalendar={setApiCalendar} />
      )}
    </Stack>
  );
}

export default App;
