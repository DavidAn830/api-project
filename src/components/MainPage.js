import { Routes, Route } from "react-router-dom";
import EventListPage from "./EventListPage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";

const MainPage = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/events" element={<EventListPage />} />
    </Routes>
  );
};

export default MainPage;
