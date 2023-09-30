import { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import ApiCalendar from "react-google-calendar-api";
import "./CalendarApp.css";

type Props = {
  setApiCalendar: React.Dispatch<React.SetStateAction<ApiCalendar | undefined>>;
};

type Config = {
  clientId: string;
  apiKey: string;
  scope: string;
  discoveryDocs: string[];
};

const defaultConfig: Config = {
  clientId: "",
  apiKey: "",
  scope: "https://www.googleapis.com/auth/calendar",
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ],
};

function Login({ setApiCalendar }: Props) {
  const [config, setConfig] = useState<Config>(defaultConfig);
  function changeConfig(itemName: string, value: string) {
    setConfig({ ...config, [itemName]: value });
  }

  function onClickLogin() {
    const apiCalendar = new ApiCalendar(config);
    setApiCalendar(apiCalendar);
    setTimeout(() => {
      apiCalendar.handleAuthClick();
    }, 1000);
  }

  return (
    <Stack className="login_area" gap="20px">
      <TextField
        label="クライアントID"
        value={config.clientId}
        onChange={(e) => changeConfig("clientId", e.target.value)}
      />
      <TextField
        label="APIキー"
        value={config.apiKey}
        onChange={(e) => changeConfig("apiKey", e.target.value)}
      />
      <Button variant="contained" onClick={onClickLogin}>
        ログイン
      </Button>
    </Stack>
  );
}

export default Login;
