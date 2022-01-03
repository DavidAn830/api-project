import { useState } from "react";
import { Menu, MenuItem } from "@material-ui/core";
import "./EventNav.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const EventNav = () => {
  // const { username } = useSelector((state) => state);
  const username = localStorage.getItem("username");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const logout = () => {
    dispatch({
      type: "CHANGE_STATUS_LOGGEDOUT",
    });
    localStorage.clear();
    navigate("/login");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="event-nav-bar">
      <div className="event-title">EventList</div>
      <div className="event-welcome">
        Welcome, {username}! &nbsp;
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="user"
          className="svg-inline--fa fa-user fa-w-14"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          onClick={handleClick}
        >
          <path
            fill="inherit"
            d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
          ></path>
        </svg>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default EventNav;
