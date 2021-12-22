import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

const CHANGE_STATUS_TRUE = "CHANGE_STATUS_LOGGEDIN";
const CHANGE_STATUS_FALSE = "CHANGE_STATUS_LOGGEDOUT";
const LOGIN = "USER_LOGGEDIN";

let status = false;
let userId;
let token;
let username;

const initialState = { status, userId, token, username };

function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_STATUS_TRUE:
      return {
        userId: action.userId,
        token: action.token,
        status: true,
        username: action.username,
      };
    case CHANGE_STATUS_FALSE:
      return { userId: "", token: "", status: false, username: "" };
    default:
      return state;
  }
}

let store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
