import ApiCalendar from "react-google-calendar-api";
import { Button, Dialog, Stack } from "@mui/material";
import { Event } from "./GoogleApi";

type Props = {
  apiCalendar: ApiCalendar;
  deletedEvent: Event | undefined;
  setDeletedEvent: React.Dispatch<React.SetStateAction<Event | undefined>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
};

function ConfirmDeleteDialog({
  apiCalendar,
  deletedEvent,
  setDeletedEvent,
  setStatus,
}: Props) {
  async function deleteEvent(event: Event) {
    return new Promise(async (resolve, reject) => {
      if (event.id) {
        setStatus("削除中...");
        apiCalendar.deleteEvent(event.id).then(() => {
          setStatus("削除完了");
        });
      }
      resolve(null);
      setDeletedEvent(undefined);
    });
  }

  return (
    <Dialog open={deletedEvent !== undefined}>
      <Stack className="dialog">
        <p className="description">イベントを削除しますか？</p>
        <Stack className="button_area" justifyContent="end" direction="row">
          <Button
            variant="contained"
            onClick={() => setDeletedEvent(undefined)}
          >
            キャンセル
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              if (deletedEvent) {
                deleteEvent(deletedEvent);
              }
            }}
          >
            削除
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
}

export default ConfirmDeleteDialog;
