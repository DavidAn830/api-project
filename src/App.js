import "./App.css";
import React, { useEffect, useState } from "react";
import EventListPage from "./components/EventListPage";
import MainPage from "./components/MainPage";
import { Provider, useSelector } from "react-redux";
import { useForceUpdate } from "./components/Hooks/useForceUpdate";

function App() {
  const status = useSelector((state) => state);
  useForceUpdate();
  return <div className="App">{status ? <EventListPage /> : <MainPage />}</div>;
}

export default App;
