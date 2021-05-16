

export default function getAppointmentsForDay(state, day) {
  
  let appointmentArr = [];
  let daysAppointments = [];
  for (let i = 0; i < state.days.length; i++) {
    if (state.days[i].name === day) {
      appointmentArr = state.days[i].appointments
    }
  }
  for (let j = 0; j < appointmentArr.length; j++) {
    for (const prop in state.appointments) {
      let appointmentId = state.appointments[prop].id
    
    if (appointmentArr[j] === appointmentId) {
      daysAppointments.push(state.appointments[prop])
    }
  }
} 
  return daysAppointments;
}
