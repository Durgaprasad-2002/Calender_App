import React, { useState, useEffect } from "react";
import "./index.css";
import { useLocation, useNavigate } from "react-router-dom";
import SelectButton from "./SelectButton";
import { useAlert } from "react-alert";
import axios from "axios";

export default function EventCreation() {
  const location = useLocation();
  const navigate = useNavigate();
  const alertMOD = useAlert();
  let [loading, setLoading] = useState(false);
  let [events, setEvents] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("user") == null) {
      navigate("/login");
    }
  }, []);

  const [Times, setTimes] = useState({
    startTime: "",
    endTime: "",
    dateOBJ: location.state,
    event: "",
  });

  const [partMail, setPartmail] = useState("");

  const HandlePartMail = (e) => {
    setPartmail(e.target.value);
  };

  let [ADDParticipants, setADD] = useState([]);

  // let ADDParticipants = [];

  const HandleParticipants = (e) => {
    console.log(partMail);
    setADD((ADDParticipants) => [...ADDParticipants, partMail]);
    document.getElementsByName("partMail")[0].value = "";
  };

  function removeElementByIndex(array, index) {
    if (index >= 0 && index < array.length) {
      array.splice(index, 1);
    }
    return array;
  }

  const removeParticipant = (ind) => {
    console.log(ind);
    let newELE = removeElementByIndex(ADDParticipants, ind);
    setADD([...newELE]);
  };

  function HandleInputs(e) {
    const { name, value } = e.target;
    console.log(name, value);
    setTimes((prevTimes) => ({
      ...prevTimes,
      [name]: value,
    }));
  }

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    duration: 1,
    participants: "",
  });

  const handleChange = (e) => {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value,
    });
  };

  function padToTwoDigits(number) {
    return number.toString().padStart(2, "0");
  }

  const handleEventSubmit = (e) => {
    e.preventDefault();

    const month = padToTwoDigits(location.state?.month + 1);
    const day = padToTwoDigits(location.state?.number);
    const year = location.state?.year;

    let user = JSON.parse(localStorage.getItem("user"));
    const Token = JSON.parse(localStorage.getItem("googleTokens"));

    const eventData = {
      title: newEvent.title,
      description: newEvent.description,
      participants: ADDParticipants,
      date: `${year}-${month}-${day}`,
      time: Times.startTime,
      endTime: Times.endTime,
      sessionNotes: "",
      userId: user.googleId,
      googleToken: Token.access_token,
    };

    console.log(eventData);

    setLoading(true);

    axios
      .post("https://calender-backend-367p.onrender.com/api/events", eventData)
      .then((response) => {
        setEvents([...events, response.data]);
        console.log(response.data);
        alertMOD.success("Event is Created, Redirecting to Home");
        setTimeout(() => navigate("/"), 5000);
        setLoading(false);
      })
      .catch((err) => {
        alertMOD.error("Failed to Create Event," + err?.response?.data?.error);
        console.log(err);
        setLoading(false);
      });
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const times = [
    "01:00 AM",
    "02:00 AM",
    "03:00 AM",
    "04:00 AM",
    "05:00 AM",
    "06:00 AM",
    "07:00 AM",
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
    "10:00 PM",
    "11:00 PM",
    "12:00 AM",
  ];

  const filterEndTimes = (startTime) => {
    if (!startTime) return times;
    const startIndex = times.indexOf(startTime);
    return times.slice(startIndex + 1);
  };

  // const NotifyTimes = ["15 min", "30 min", "1 hr"];

  return (
    <>
      <div>
        <div className="Calender-Event-bar">
          <div>
            <span>Create new event on</span>
            <h3>
              {location.state?.number} {months[location.state?.month]},{" "}
              {location.state?.year}
            </h3>
          </div>
          <button className="button-17" onClick={() => navigate("/", {})}>
            Home
          </button>
        </div>
      </div>
      <div>
        <form onSubmit={handleEventSubmit}>
          <h4 className="event-form-label">Enter the Event name</h4>
          <div className="input-container col-md-3">
            <input
              placeholder="title"
              className="input-field"
              type="text"
              required
              name="title"
              onChange={handleChange}
            />
            <label htmlFor="input-field" className="input-label">
              Email
            </label>
            <span className="input-highlight"></span>
          </div>

          {/*  */}
          <h4 className="event-form-label">Description</h4>
          <div className="input-container col-md-3">
            <input
              placeholder="desc.."
              className="input-field"
              type="text"
              required
              name="description"
              onChange={handleChange}
            />
            <label htmlFor="input-field" className="input-label">
              Email
            </label>
            <span className="input-highlight"></span>
          </div>
          {/*  */}
          <div className="select-container">
            <div className="select-item">
              <h4 className="event-form-label">Start Time</h4>
              <SelectButton
                data={times}
                Handle={HandleInputs}
                name="startTime"
              />
            </div>
            <div className="select-item">
              <h4 className="event-form-label">End Time</h4>
              <SelectButton
                data={filterEndTimes(Times.startTime)}
                Handle={HandleInputs}
                name="endTime"
              />
            </div>
          </div>
          <h4 className="event-form-label">Enter Participants Mail</h4>
          <div className="input-container col-md-3">
            <input
              placeholder="email"
              className="input-field"
              type="email"
              name="partMail"
              onChange={HandlePartMail}
            />
            <label htmlFor="input-field" className="input-label">
              email
            </label>
            <span className="input-highlight"></span>
          </div>
          <div className="outer-Submit">
            <button
              onClick={HandleParticipants}
              type="button"
              className="button-18"
            >
              add
            </button>
          </div>
          <div className="Container-participants">
            {ADDParticipants.length == 0
              ? "No Participants were added"
              : ADDParticipants.map((ele, ind) => {
                  return (
                    <button
                      className="part-item-btn"
                      type="button"
                      onClick={() => removeParticipant(ind)}
                    >
                      <span className="part-item">
                        {ele} <b>✕</b>
                      </span>
                    </button>
                  );
                })}
          </div>
          <div className="outer-Submit">
            <button type="submit" className="button-18">
              Create Event
            </button>
          </div>
        </form>
        <br />
      </div>
      <div className="footer">
        <p>DURGA PRASAD © 2024</p>
      </div>
    </>
  );
}
