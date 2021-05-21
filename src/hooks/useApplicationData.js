import React, { useEffect, useState } from "react";

import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviews: {},
    interviewers: [],
  });

  const setDay = (day) => setState({ ...state, day });


  const getSpotsById = function(dayObj, appointments) {
    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      } else if (appointment.interview) {}
    }
    return spots;
  };

const updateSpots = function(appointmentId, days, appointments) {

  const dayObj = days.find(day => day.appointments.includes(appointmentId))
  const spots = getSpotsById(dayObj, appointments);
  const newDay = {...dayObj, spots};
  dayObj.spots = spots;

  const newDays = days.map(day => day.name === dayObj.name ? newDay : day);

  return newDays;
  
};
  
  function bookInterview(id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = updateSpots(id, state.days, appointments);

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        setState({
          ...state,
          appointments,
          days,
        });
        return Promise.resolve();
      });
  }


  function cancelInterview(id) {
    updateSpots(id, state.days, state.appointments);
    return axios.delete(`/api/appointments/${id}`)
    .then((response) => {
      setState({
        ...state,
      })
      return Promise.resolve();
    });
  }

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);


  return { state, setDay, bookInterview, cancelInterview };

};