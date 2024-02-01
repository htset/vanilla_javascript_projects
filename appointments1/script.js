const displayedDateEl = document.getElementById("displayedDate");
const previousDateEl = document.getElementById("previousDate");
const nextDateEl = document.getElementById("nextDate");
const gotoDateEl = document.getElementById("gotoDate");
const appointmentFormEl = document.getElementById("appointmentForm");
const appointmentsListEl = document.getElementById("appointments");
const appointmentDescEl = document.getElementById("appointmentDesc");
const appointmentDateEl = document.getElementById("appointmentDate");
const appointmentTimeEl = document.getElementById("appointmentTime");
const saveEl = document.getElementById("save");
const deleteEl = document.getElementById("delete");

//create initial appointment list
const createAppointmentList = function () {
  for (let i = 0; i < 24; i++) {
    //create <li> element
    const item = document.createElement("li");
    const textnode = document.createTextNode(i);
    item.appendChild(textnode);
    item.setAttribute("class", "list-group-item");
    item.setAttribute("id", "hour_" + i);
    item.addEventListener("click", handleClickOnHour);
    appointmentsListEl.appendChild(item);

    //create <option> for hours <select> element
    const option = document.createElement("option");
    const textnode_option = document.createTextNode(i);
    option.setAttribute("value", i);
    option.appendChild(textnode_option);
    appointmentTimeEl.append(option);
  }
}

//clear appointments from list
const clearAppointmentsList = function () {
  for (let i = 0; i < 24; i++) {
    document.getElementById("hour_" + i).innerHTML = i;
    document.getElementById("hour_" + i).classList.remove("active");
  }
}

//update appointments list
const updateUI = function () {
  displayedDateEl.innerHTML = displayedDate.toDateString();

  clearAppointmentsList();

  //get appointments for displayed date
  let appointmentsInDay = appointments.get(displayedDate.toDateString());
  if (appointmentsInDay !== undefined) {
    appointmentsInDay.forEach((value, key) => {
      if (value !== undefined) {
        document.getElementById("hour_" + key).innerHTML = key + "  " + value;
        document.getElementById("hour_" + key).classList.add("active");
      }
    });
  }
}

//called when user clicks on an hour
const handleClickOnHour = function (event) {
  //remove highlight from previously selected hour
  document.getElementById("hour_" + selectedTime)
      .classList.remove("list-group-item-dark");
  selectedTime = event.target.id.substring(5, event.target.id.length);

  appointmentFormEl.style.visibility = "visible";

  //get appointment description from Map and display it in text box
  let tmp = appointments.get(displayedDate.toDateString());
  if (tmp !== undefined) {
    if (tmp[selectedTime] !== undefined) {
      appointmentDescEl.value = tmp[selectedTime];
      selectedDesc = tmp[selectedTime];
    }
    else {
      appointmentDescEl.value = "";
    }
  }
  else {
    appointmentDescEl.value = "";
  }

  //update appointment date and time controls
  appointmentDateEl.value = getDateOnlyString(displayedDate);
  appointmentTimeEl.value = selectedTime;

  //add highlight to newly selected hour
  document.getElementById("hour_" + selectedTime)
    .classList.add("list-group-item-dark");

  appointmentDescEl.focus();
}

//update appointment when user presses save
const updateAppointment = function (appDesc, appDate, appTime) {
  if (appointments.get(appDate.toDateString()) === undefined) {
    //if there is no entry in the map for this date 
    // ->we save the appointment
    appointments.set(appDate.toDateString(), new Array());
    appointments.get(appDate.toDateString())[appTime] = appDesc;
  }
  else {
    //if there is an entry in the map for this date
    // ->first check if the time is empty
    if (appointments.get(appDate.toDateString())[appTime] === undefined) {
      appointments.get(appDate.toDateString())[appTime] = appDesc;
    }
    else {
      //check if it is the same entry
      if (areDatesEqual(selectedDate, appDate)
        && selectedTime == appTime) {
        //just update description without asking user
        appointments.get(appDate.toDateString())[appTime] = appDesc;
      }
      else {
        //ask user to overwrite existing entry
        let ret = confirm("Destination date and time not empty. Overwrite?");
        if (ret) {
          //insert entry to new location
          appointments.get(appDate.toDateString())[appTime] = appDesc;
        }
        else
          return;
      }
    }
  }

  if (!areDatesEqual(selectedDate, appDate) || selectedTime != appTime) {
    //remove entry from previous location
    appointments.get(selectedDate.toDateString())[selectedTime]
      = undefined;
  }

  //if we moved the appointment to another date -> go to this date
  if (!areDatesEqual(selectedDate, appDate)) {
    displayedDateTime = appDate;
    displayedDate = appDate;
    updateUI();
  }

  //remove highlight from previously selected hour
  document.getElementById("hour_" + selectedTime)
    .classList.remove("list-group-item-dark");
  selectedDate = appDate;
  selectedTime = appTime;
  //add highlight to newly selected hour
  document.getElementById("hour_" + selectedTime)
      .classList.add("list-group-item-dark");
}

//move to next date
nextDateEl.addEventListener("click", () => {
  displayedDateTime.setDate(displayedDateTime.getDate() + 1);
  displayedDate = getDateOnly(displayedDateTime);
  appointmentFormEl.style.visibility = "hidden";
  updateUI();
});

//move to previous date
previousDateEl.addEventListener("click", () => {
  displayedDateTime.setDate(displayedDateTime.getDate() - 1);
  displayedDate = getDateOnly(displayedDateTime);
  appointmentFormEl.style.visibility = "hidden";
  updateUI();
});

//select new date
gotoDateEl.addEventListener("change", () => {
  displayedDateTime = new Date(gotoDateEl.value);
  displayedDate = getDateOnly(displayedDateTime);
  appointmentFormEl.style.visibility = "hidden";
  updateUI();
});

//save/update appointment
saveEl.addEventListener("click", () => {
  const descr = appointmentDescEl.value;
  const dateTime = new Date(appointmentDateEl.value);
  const date = getDateOnly(dateTime);
  const time = appointmentTimeEl.value;
  updateAppointment(descr, date, time);
  updateUI();
});

//delete appointment
deleteEl.addEventListener("click", () => {
  const dateTime = new Date(appointmentDateEl.value);
  const date = getDateOnly(dateTime);
  const time = parseInt(appointmentTimeEl.value);
  if (appointments.get(date.toDateString()) !== undefined) {
    appointments.get(date.toDateString())[time] = undefined;
  }

  updateUI();
  appointmentDescEl.value = "";
});

//helper function for date comparison
const areDatesEqual = function (date1, date2) {
  if (date1.getFullYear() == date2.getFullYear()
    && date1.getMonth() == date2.getMonth()
    && date1.getDate() == date2.getDate())
    return true;
  else
    return false;
}

const getDateOnlyString = function (date) {
  return date.getFullYear()
    + "-" + ("0" + (date.getMonth() + 1)).slice(-2)
    + "-" + ("0" + date.getDate()).slice(-2);
}

const getDateOnly = function (date) {
  return new Date(date.getFullYear()
    + "-" + ("0" + (date.getMonth() + 1)).slice(-2)
    + "-" + ("0" + date.getDate()).slice(-2));
}


//startup
let selectedDesc, selectedDate, selectedTime;
//appointments are stored in a map structure
let appointments = new Map();

let displayedDateTime = new Date();
let displayedDate = getDateOnly(displayedDateTime);
displayedDateEl.innerHTML = displayedDate.toDateString();


createAppointmentList();
appointmentFormEl.style.visibility = "hidden";

selectedDate = displayedDate;
selectedTime = 8;
