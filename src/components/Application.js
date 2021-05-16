import React, { useState, useEffect } from "react";

import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import "components/Appointment";
import Appointment from "components/Appointment";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "3pm",
    interview: {
      student: "Melissa Robbin",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 4,
    time: "4pm",
    interview: {
      student: "Jordan McDonald",
      interviewer: {
        id: 5,
        name: "Sven Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  },
  {
    id: 5,
    time: "12pm",
    interview: {
      student: "Adam Baldwin",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  }
];


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: []
  });
  
  // const state = {day: "Monday",days: [] };
  // setState({ ...state, day: "Tuesday" });

  const setDay = day => setState({ ...state, day });

  const setDays = (days) => {
  setState(prev => ({ ...prev, days }));
}

  useEffect(() => {
    axios.get("http://localhost:8001/api/days")
    .then(response => setDays(response.data));
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
          <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
            />
          <hr className="sidebar__separator sidebar--centered"/>
          <nav className="sidebar__menu">
            <DayList
              days={state.days}
              day={state.day}
              setDays
            />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
      </section>
      <section className="schedule">
        {appointments.map((appointment) => {
          
          return (
          <Appointment
          key={appointment.id}
          time={appointment.time}
          interview={appointment.interview}
          student={appointment.interview && appointment.interview.student}
          interviewer={appointment.interview && appointment.interview.interviewer && appointment.interview.interviewer.name}
           />)
           })
          }
      </section>
    </main>
  );
}
