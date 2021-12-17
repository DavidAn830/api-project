import { TextField, Button } from "@material-ui/core";
import axios from "axios";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";

const baseURL = "http://localhost:4000";
const loginPath = "api/user/login";

const Login = () => {
  const status = useSelector((state) => state);
  const dispatch = useDispatch();

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
        console.log(res.data);
        dispatch({ type: "CHANGE_STATUS_LOGGEDIN" });
        return res.data;
      })
      .catch((error) => alert("wrong user information (unauthorized)"));
  };
  return (
    <form className="login-container" onSubmit={handleSubmit}>
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
