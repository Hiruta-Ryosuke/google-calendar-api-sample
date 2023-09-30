import { useState } from "react";
import { Event } from "./GoogleApi";
import ApiCalendar from "react-google-calendar-api";
import { Button, Dialog, Stack, TextField } from "@mui/material";
import "./CalendarApp.css";

type Props = {
  apiCalendar: ApiCalendar;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
};

// 例: "2023-09-30T12:33:13.896Z" => "2023-09-30T12:33"
function formatDateTime(dateString: string): string {
  // Dateオブジェクトを作成
  const dateObject = new Date(dateString);

  // 日付と時刻の要素を取得
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // 月は0から始まるため、+1しています
  const day = String(dateObject.getDate()).padStart(2, "0");
  const hours = String(dateObject.getHours()).padStart(2, "0");
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");

  // 新しい形式の文字列を生成
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

const defaultEvent = (date: Date): Event => {
  return {
    summary: "",
    start: {
      dateTime: date.toISOString(),
      timeZone: "Asia/Tokyo",
    },
    end: {
      dateTime: new Date(date.getTime() + 3600000).toISOString(),
      timeZone: "Asia/Tokyo",
    },
  };
};

function CreateDialog({ apiCalendar, isOpen, setIsOpen, setStatus }: Props) {
  const [event, setEvent] = useState<Event>(defaultEvent(new Date()));

  async function createEvents() {
    return new Promise(async (resolve, reject) => {
      setStatus("追加中...");
      apiCalendar.createEvent(event).then((res: any) => {
        setEvent(defaultEvent(new Date()));
        setStatus("追加完了");
      });
      resolve(null);
    });
  }

  return (
    <Dialog open={isOpen}>
      <Stack className="dialog">
        <TextField
          label="タイトル"
          value={event.summary}
          onChange={(e) => setEvent({ ...event, summary: e.target.value })}
        />
        <TextField
          label="開始時刻"
          type="datetime-local"
          value={formatDateTime(event.start.dateTime)}
          onChange={(e) => {
            setEvent({
              ...event,
              start: {
                ...event.start,
                dateTime: new Date(e.target.value).toISOString(),
              },
            });
          }}
        />
        <TextField
          label="終了時刻"
          type="datetime-local"
          value={formatDateTime(event.end.dateTime)}
          onChange={(e) =>
            setEvent({
              ...event,
              end: {
                ...event.end,
                dateTime: new Date(e.target.value).toISOString(),
              },
            })
          }
        />
        <Stack className="button_area" justifyContent="end" direction="row">
          <Button variant="contained" onClick={() => setIsOpen(false)}>
            キャンセル
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              createEvents();
              setIsOpen(false);
            }}
          >
            イベントを追加
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
}

export default CreateDialog;
