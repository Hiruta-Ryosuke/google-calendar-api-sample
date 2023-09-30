import { useState } from "react";
import ApiCalendar from "react-google-calendar-api";
import { Button, Dialog, Stack } from "@mui/material";
import CreateDialog from "./CreateDialog";
import EventsTable from "./EventsTable";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import "./CalendarApp.css";

export type Props = {
  apiCalendar: ApiCalendar;
};

export type Event = {
  id?: string;
  summary: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
};

function GoogleApi({ apiCalendar }: Props) {
  const [status, setStatus] = useState<string>("");
  const [events, setEvents] = useState<Event[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAutoCreateOpen, setIsAutoCreateOpen] = useState<boolean>(false);
  const [deletedEvent, setDeletedEvent] = useState<Event | undefined>(
    undefined
  );

  async function getEvents() {
    return new Promise(async (resolve, reject) => {
      setStatus("取得中...");
      const FromDate = new Date();
      const ToDate = new Date();
      ToDate.setDate(ToDate.getDate() + 10);
      apiCalendar
        .listEvents({
          timeMin: FromDate.toISOString(),
          timeMax: ToDate.toISOString(),
          showDeleted: false,
          maxResults: 10,
          orderBy: "updated",
        })
        .then(({ result }: any) => {
          setEvents(result.items);
          setStatus("取得完了");
        });
      resolve(null);
    });
  }

  return (
    <>
      <Stack alignItems="center" gap="10px">
        <div>{status !== "" && "ステータス : " + status}</div>
        <Stack className="button_area" direction="row">
          <Button variant="contained" onClick={() => getEvents()}>
            予定を取得（最大10件）
          </Button>
          <Button variant="contained" onClick={() => setIsOpen(true)}>
            予定を追加
          </Button>
          <Button variant="contained" onClick={() => setIsAutoCreateOpen(true)}>
            自動追加【実装前】
          </Button>
        </Stack>
        <EventsTable events={events} setDeletedEvent={setDeletedEvent} />
      </Stack>
      <ConfirmDeleteDialog
        apiCalendar={apiCalendar}
        deletedEvent={deletedEvent}
        setDeletedEvent={setDeletedEvent}
        setStatus={setStatus}
      />
      <CreateDialog
        apiCalendar={apiCalendar}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setStatus={setStatus}
      />
      <Dialog open={isAutoCreateOpen}>
        <Stack className="dialog">
          <p className="description">
            実装前の機能です。
            <br />
            ChatGPTに勝手に予定を作ってもらいます。
          </p>
          <Stack className="button_area" justifyContent="end" direction="row">
            <Button
              variant="contained"
              onClick={() => setIsAutoCreateOpen(false)}
            >
              閉じる
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    </>
  );
}

export default GoogleApi;
