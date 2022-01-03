import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Button,
  TableBody,
  TextField,
  Checkbox,
} from "@material-ui/core";
import { LocalizationProvider, DateTimePicker } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Event.css";
import axios from "axios";
import dayjs from "dayjs";
import "./Event.css";

const Event = () => {
  // const { token } = useSelector((state) => state);
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  // const instance = axios.create({
  //   baseURL: "http://localhost:4000/api/",
  //   timeout: 3000,
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });

  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [events, setEvents] = useState([]);

  const [fromTime, setFromTime] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());
  const [content, setContent] = useState("");
  const [completed, setCompleted] = useState(false);

  // update
  useEffect(() => {
    getEvents();
  }, [isAdd, isEdit]);

  // Change add status
  const handleAddButton = () => {
    setIsAdd(true);
  };

  // Set new from date&time
  const handleFromChange = (e) => {
    // console.log(e, "e value");
    setFromTime(e);
  };

  // Set new to date&time
  const handleToChange = (e) => {
    console.log(e);
    setToTime(e);
  };

  // Set new content
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  // Set new completed status
  const handleCompletedChange = (e) => {
    // console.log(e.target.checked);

    setCompleted(e.target.checked);
  };

  // Get events
  const getEvents = async () => {
    await axios.get("http://localhost:4000/api/event/").then((res) => {
      setEvents(res.data.result);
    });
  };
  // Handle save button
  const handleSave = async () => {
    await axios
      .post("http://localhost:4000/api/event/", {
        from: fromTime,
        to: toTime,
        content: content,
        isCompleted: completed,
      })
      .then((res) => console.log("after post request", res.data))
      .catch((error) => {
        console.log(error);
      });
    resetDateTime();
    setIsAdd(false);
  };

  // Handle edit button
  const handleEdit = async (event) => {
    console.log(event);
    console.log(event.content, event.isCompleted, "in edit");
    await axios
      .put(`http://localhost:4000/api/event/${event._id}`, {
        from: event.from,
        to: event.to,
        content: event.content,
        isCompleted: event.isCompleted,
      })
      .then((res) => console.log("put request successful", res.data));
    setIsEdit(false);
  };

  // Handle delete button
  const handleDelete = async (event) => {
    await axios
      .delete(`http://localhost:4000/api/event/${event._id}`)
      .then((res) => console.log(res));
    setIsEdit(false);
  };

  const resetDateTime = () => {
    setFromTime(new Date());
    setToTime(new Date());
  };

  return (
    <div className="event-container">
      <TableContainer className="event-table" component={Paper}>
        <Table sx={{ minwidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="header-btn">
              <header className="add-btn-padding">
                <Button
                  className="add-btn"
                  variant="contained"
                  color="primary"
                  onClick={handleAddButton}
                >
                  Add
                </Button>
              </header>
            </TableRow>
            <TableRow>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isAdd ? (
              <TableRow>
                <TableCell>
                  <LocalizationProvider dateAdapter={DateAdapter}>
                    <DateTimePicker
                      label="From"
                      value={fromTime}
                      onChange={handleFromChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </TableCell>
                <TableCell>
                  <LocalizationProvider dateAdapter={DateAdapter}>
                    <DateTimePicker
                      label="To"
                      value={toTime}
                      onChange={handleToChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </TableCell>
                <TableCell>
                  <TextField onChange={handleContentChange}></TextField>
                </TableCell>
                <TableCell>
                  <Checkbox color="primary" onChange={handleCompletedChange} />
                </TableCell>
                <TableCell>
                  <Button
                    onClick={handleSave}
                    color="primary"
                    variant="contained"
                  >
                    Save
                  </Button>
                </TableCell>
              </TableRow>
            ) : null}
            {events.map((event) => (
              <TableRow key={event._id}>
                {isEdit ? (
                  <>
                    <TableCell>
                      <LocalizationProvider dateAdapter={DateAdapter}>
                        <DateTimePicker
                          label="From"
                          value={new Date(event.from)}
                          onChange={(e) => (event.from = e)}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </TableCell>
                    <TableCell>
                      <LocalizationProvider dateAdapter={DateAdapter}>
                        <DateTimePicker
                          label="To"
                          onChange={(e) => (event.to = e)}
                          value={new Date(event.to)}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </TableCell>
                    <TableCell>
                      <TextField
                        defaultValue={event.content}
                        onChange={(e) => {
                          event.content = e.target.value;
                          // console.log(event.content);
                        }}
                      ></TextField>
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        defaultChecked={event.isCompleted}
                        color="primary"
                        onChange={(e) => {
                          event.isCompleted = e.target.checked;
                          // console.log(event.isCompleted, "completed");
                          handleCompletedChange(e);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEdit(event)}
                      >
                        Save
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(event)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>
                      {dayjs(event.from).format("MM/DD/YYYY, hh:mm:ss A")}
                    </TableCell>
                    <TableCell>
                      {dayjs(event.to).format("MM/DD/YYYY, hh:mm:ss A")}
                    </TableCell>
                    <TableCell>{event.content}</TableCell>
                    <TableCell>
                      {event.isCompleted ? "completed" : "pending"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          setIsEdit(true);
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Event;
