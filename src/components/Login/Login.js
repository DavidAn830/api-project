import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import axios from "axios";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const baseURL = "http://localhost:4000";
const loginPath = "api/user/login";

const Login = () => {
  // const { status, userId, token, username } = useSelector((state) => state);
  // const status = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    axios
      .post([baseURL, loginPath].join("/"), {
        username: username,
        password: password,
      })
      .then((res) => {
        dispatch({
          type: "CHANGE_STATUS_LOGGEDIN",
          userId: res.data.data.userId,
          token: res.data.data.token,
          username: username,
        });
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("username", username);
        navigate("/events");
      })
      .catch((error) =>
        alert("user information does not match (unauthorized)")
      );
  };
  return (
    <form className="login-container" onSubmit={handleSubmit}>
      <div className="lock">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="lock"
          className="svg-inline--fa fa-lock fa-w-14"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="purple"
            d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"
          ></path>
        </svg>
      </div>
      <h1>Log In</h1>
      <TextField
        className="login-input"
        required
        label="username"
        placeholder="Username"
        name="username"
        variant="outlined"
      />
      <TextField
        className="login-input"
        required
        label="password"
        placeholder="Password"
        name="password"
        variant="outlined"
        type="password"
      />
      <FormControlLabel
        className="remember-me"
        control={<Checkbox color="primary" aria-label="Checkbox demo" />}
        label="Remember Me"
      />
      <Button
        className="login-btn"
        variant="contained"
        color="primary"
        type="submit"
      >
        LOGIN
      </Button>
    </form>
  );
};

export default Login;
