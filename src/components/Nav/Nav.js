import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  return (
    <div className="nav-bar">
      <div className="title">Event List</div>
      <div className="links">
        <Link className="login" to="/login">
          LOGIN
        </Link>
        <Link className="sign-up" to="/signup">
          SIGNUP
        </Link>
      </div>
    </div>
  );
};

export default Nav;
