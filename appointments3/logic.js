console.log("a");

/////////////////////////////////////////////////////
///  Business logic
/////////////////////////////////////////////////////

//checks whether a time slot is already occupied
const slotAlreadyTaken = function (state, date, time) {
  if (state.appointments.get(date.toDateString()) !== undefined
    && state.appointments.get(date.toDateString()).get(time) !== undefined)
    return true;
  else
    return false;
}

//update appointment when user presses save
const updateAppointment = function (state, newDesc, newDate, newTime) {
  let newAppointments = new Map();
  state.appointments.forEach((value, key) => {
    newAppointments.set(key, new Map());
    state.appointments.get(key).forEach((v, k) => {
      if (!(state.selectedDate.toDateString() == key && state.selectedTime == k)) {
        newAppointments.get(key).set(k, state.appointments.get(key).get(k));
      }
    });
  });

  if (!newAppointments.has(newDate.toDateString())) {
    newAppointments.set(newDate.toDateString(), new Map());
  }
  newAppointments.get(newDate.toDateString()).set(newTime, newDesc);

  let newState = {
    appointments: newAppointments,
    displayedDate: newDate,
    selectedDesc: newDesc,
    selectedDate: newDate,
    selectedTime: newTime,
    selectedVisible: state.selectedVisible
  }

  return newState;
}

const deleteAppointment = function (state, date, time) {
  let newAppointments = new Map();
  state.appointments.forEach((value, key) => {
    newAppointments.set(key, new Map());
    state.appointments.get(key).forEach((v, k) => {
      if (!(date.toDateString() == key && time == k)) {
        newAppointments.get(key).set(k, state.appointments.get(key).get(k));
      }
    });
  });

  let newState = {
    appointments: newAppointments,
    displayedDate: state.displayedDate,
    selectedDesc: "",
    selectedDate: state.selectedDate,
    selectedTime: state.selectedTime,
    selectedVisible: state.selectedVisible
  }

  return newState;
}

//called when the user clicks on a time slot
const selectSlot = function (state, newTime) {
  let newDesc;

  //get appmt description from Map and display it in text box
  let tmp = state.appointments.get(state.displayedDate.toDateString());
  if (tmp !== undefined) {
    if (tmp.get(newTime) !== undefined) {
      newDesc = tmp.get(newTime);
    }
    else {
      newDesc = "";
    }
  }
  else {
    newDesc = "";
  }

  let newState = {
    appointments: state.appointments,
    displayedDate: state.displayedDate,
    selectedDesc: newDesc,
    selectedDate: state.displayedDate,
    selectedTime: newTime,
    selectedVisible: true
  }

  return newState;

}

//update the displayedDate variable
const updateDisplayedDate = function(state, newDate){
  let newDisplayedDate = getDateOnly(newDate);

  let newState = {
    appointments: state.appointments,
    displayedDate: newDisplayedDate,
    selectedDesc: state.selectedDesc,
    selectedDate: newDisplayedDate,
    selectedTime: state.selectedTime,
    selectedVisible: false
  }  
  return newState;
}

//increase/descrease displayedDate
const addDaysToDate = function(state, days){
  let newDisplayedDate = state.displayedDate;
  newDisplayedDate.setDate(state.displayedDate.getDate() + days);

  let newState = {
    appointments: state.appointments,
    displayedDate: newDisplayedDate,
    selectedDesc: state.selectedDesc,
    selectedDate: state.selectedDate,
    selectedTime: state.selectedTime,
    selectedVisible: false
  }  
  return newState;
}

console.log("b");
