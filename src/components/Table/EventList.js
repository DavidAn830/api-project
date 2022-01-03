import { TableCell, TableRow, Button, TextField } from "@material-ui/core";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

let eventlist = [];
const EventList = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/event/").then((res) => {
      eventlist = [...eventlist, ...res.data.result];
      console.log(eventlist);
      eventlist.map((item) => {
        const fromTime = dayjs(item.from).format("MM/DD/YYYY, hh:mm:ss A");
        const toTime = dayjs(item.to).format("MM/DD/YYYY, hh:mm:ss A");
        const content = item.content;
        const status = "pending";
        const btn = "Edit";
        const newItem = { fromTime, toTime, content, status, btn };
        setList((currentArray) => [...currentArray, newItem]);
      });
    });
  }, []);

  return (
    <>
      {list.map((listitem) => (
        <TableRow>
          <TableCell>{listitem.fromTime}</TableCell>
          <TableCell>{listitem.toTime}</TableCell>
          <TableCell>{listitem.content}</TableCell>
          <TableCell>{listitem.status}</TableCell>
          <TableCell>
            <Button variant="contained" color="primary">
              {listitem.btn}
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default EventList;
