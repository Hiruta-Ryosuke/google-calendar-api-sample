import { Event } from "./GoogleApi";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

type Props = {
  events: Event[];
  setDeletedEvent: React.Dispatch<React.SetStateAction<Event | undefined>>;
};

function EventsTable({ events, setDeletedEvent }: Props) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>No.</TableCell>
          <TableCell>タイトル</TableCell>
          <TableCell>開始</TableCell>
          <TableCell>終了</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {events.map((ev, idx) => (
          <TableRow key={ev.id}>
            <TableCell>{idx}</TableCell>
            <TableCell>{ev.summary}</TableCell>
            <TableCell>
              {new Date(ev.start.dateTime).toLocaleString()}
            </TableCell>
            <TableCell> {new Date(ev.end.dateTime).toLocaleString()}</TableCell>
            <TableCell>
              <Button
                variant="contained"
                onClick={() => {
                  setDeletedEvent(ev);
                }}
              >
                削除
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default EventsTable;
