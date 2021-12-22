import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import axios from "axios";
import "./SignUp.css";

const baseURL = "http://localhost:4000";
const signupPath = "api/user/signup";
const SignUp = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const repassword = event.target.repassword.value;
    if (password !== repassword) {
      alert("password does not match");
    } else {
      axios
        .post([baseURL, signupPath].join("/"), {
          username: username,
          password: password,
          isAdmin: false,
        })
        .then((res) => console.log(res.data));
    }
  };
  return (
    <form className="sign-up-container" onSubmit={handleSubmit}>
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
      <h1>Sign Up</h1>
      <TextField
        className="sign-up-input"
        required
        label="username"
        placeholder="Username"
        name="username"
        variant="outlined"
      />
      <TextField
        className="sign-up-input"
        required
        label="password"
        placeholder="Password"
        variant="outlined"
        name="password"
        type="password"
      />
      <TextField
        className="sign-up-input"
        required
        label="re-password"
        placeholder="Repeat Password"
        variant="outlined"
        name="repassword"
        type="password"
      />
      <FormControlLabel
        className="remember-me"
        control={<Checkbox color="primary" aria-label="Checkbox demo" />}
        label="Remember Me"
      />
      <Button
        className="sign-up-btn"
        variant="contained"
        color="primary"
        type="submit"
      >
        SIGN UP
      </Button>
    </form>
  );
};

export default SignUp;
