
//Get appointments helper function:
export const getAppointmentsForDay = (state, day) => {
  let appointmentArr = [];
  let daysAppointments = [];
  for (let i = 0; i < state.days.length; i++) {
    if (state.days[i].name === day) {
      appointmentArr = state.days[i].appointments;
    }
  }
  for (let j = 0; j < appointmentArr.length; j++) {
    for (const prop in state.appointments) {
      let appointmentId = state.appointments[prop].id;

      if (appointmentArr[j] === appointmentId) {
        daysAppointments.push(state.appointments[prop]);
      }
    }
  }
  return daysAppointments;
};


//Get interviewer helper function:
export const getInterview = (state, interview) => {
  for (let interviewerId in interview) {
    let assignedInterviewer = interview[interviewerId];

    for (let val in state.interviewers) {
      let selectedInterviewer = state.interviewers[val].id;

      if (assignedInterviewer === selectedInterviewer) {
        let interviewerObj = state.interviewers[val];

        let newObj = {
          student: "",
          interviewer: { id: 0, name: "", avatar: "" },
        };
        let source = {
          student: interview.student,
          interviewer: interviewerObj,
        };
        Object.assign(newObj, source);
        return newObj;
      }
    }
  }
  return null;
};



