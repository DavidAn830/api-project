import { Button, TextField } from "@material-ui/core";
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
