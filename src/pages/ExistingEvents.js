import React, { useState, useEffect } from "react";
import "./index.css";
import { useLocation, useNavigate } from "react-router-dom";
import noevent from "../Images/noevent.webp";
import { BiPlus } from "react-icons/bi";
import axios from "axios";
import { useAlert } from "react-alert";

export default function ExistingEvents() {
  const [Events, setEvents] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const alertMOD = useAlert();
  const user = JSON.parse(localStorage.getItem("user"));
  const Token = JSON.parse(localStorage.getItem("googleTokens"));

  useEffect(() => {
    if (user?.googleId == undefined || user == null) {
      navigate("/login");
    }
  }, []);

  const DeleteEvent = (ele) => {
    const access_token = Token.access_token;
    console.log(access_token);
    axios
      .delete(
        `https://calender-backend-367p.onrender.com/api/events/?id=${ele}&googleToken=${access_token}`
      )
      .then((data) => {
        alertMOD.success(`${ele} Id Event is Deleted`);
        FETCHEvents();
      })
      .catch((err) => {
        alertMOD.error("Failed to Remove");
        console.log(err);
      });
  };

  function padToTwoDigits(number) {
    return number.toString().padStart(2, "0");
  }

  function FETCHEvents() {
    const month = padToTwoDigits(location.state?.month + 1);
    const day = padToTwoDigits(location.state?.number);
    const year = location.state?.year;
    const full = `${year}-${month}-${day}`;

    axios
      .get(
        `https://calender-backend-367p.onrender.com/api/events?id=${user?.googleId}&date=${full}`
      )
      .then((data) => {
        console.log(data);
        setEvents([...data.data]);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => FETCHEvents(), []);

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

  return (
    <>
      <div>
        <div className="Calender-Event-bar">
          <div>
            <span>Event's day</span>
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
      <div className="Events-container">
        {Events.length === 0 ? (
          <div className="outer-no-event">
            <img src={noevent} className="no-event" alt="No event" />
            <p>Currently no Events are Scheduled</p>
          </div>
        ) : (
          <>
            <div className="Events-conatiner">
              {Events.map((event) => {
                return (
                  <div className="Event-card">
                    <div className="Event-title">
                      <h2 className="title-name">
                        {event.title.toUpperCase()}
                      </h2>
                      <button
                        className="delete-btn"
                        onClick={() => DeleteEvent(event._id)}
                      >
                        Delete
                      </button>
                    </div>

                    <p className="Event-description">{event.description}</p>
                    <p>
                      <strong>Event Time :</strong>{" "}
                      <span>{event.startTime}</span>
                      {" → "}
                      <span>{event.endTime}</span>
                    </p>
                    <div>
                      {event.participants.map((part) => (
                        <button className="part-item-btn1">{part}</button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      <button
        className="Create-BTN"
        onClick={() => {
          navigate("/CreateEvent", { state: location.state });
        }}
        title="Create Event"
      >
        <BiPlus />
      </button>
      <div className="footer">
        <p>DURGA PRASAD © 2024</p>
      </div>
    </>
  );
}
