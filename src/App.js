import "./App.css";
import Calender from "./pages/Calender";
// import Events from "./pages/Events";
import EventCreation from "./pages/EventCreation";
import ExistingEvents from "./pages/ExistingEvents";
import GoogleLogin from "./pages/GoogleLogin";
import NoPage from "./pages/NoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Calender />} />
          <Route path="login" element={<GoogleLogin />} />
          <Route path="Events" element={<ExistingEvents />} />
          <Route path="CreateEvent" element={<EventCreation />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
