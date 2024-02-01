/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addDaysToDate: () => (/* binding */ addDaysToDate),
/* harmony export */   deleteAppointment: () => (/* binding */ deleteAppointment),
/* harmony export */   selectSlot: () => (/* binding */ selectSlot),
/* harmony export */   slotAlreadyTaken: () => (/* binding */ slotAlreadyTaken),
/* harmony export */   updateAppointment: () => (/* binding */ updateAppointment),
/* harmony export */   updateDisplayedDate: () => (/* binding */ updateDisplayedDate)
/* harmony export */ });
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


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
  let newDisplayedDate = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.getDateOnly)(newDate);

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


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   areDatesEqual: () => (/* binding */ areDatesEqual),
/* harmony export */   getDateOnly: () => (/* binding */ getDateOnly),
/* harmony export */   getDateOnlyString: () => (/* binding */ getDateOnlyString)
/* harmony export */ });
/////////////////////////////////////////////////////
///  Helper Functions
/////////////////////////////////////////////////////

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


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearAppointmentsList: () => (/* binding */ clearAppointmentsList),
/* harmony export */   createAppointmentList: () => (/* binding */ createAppointmentList),
/* harmony export */   updateUI: () => (/* binding */ updateUI)
/* harmony export */ });
/* harmony import */ var _logic_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);



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


/////////////////////////////////////////////////////
///  UI Functions
/////////////////////////////////////////////////////

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
const updateUI = function (state) {
  displayedDateEl.innerHTML = state.displayedDate.toDateString();
  appointmentDescEl.value = state.selectedDesc;
  appointmentDateEl.value = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.getDateOnlyString)(state.selectedDate);
  appointmentTimeEl.value = state.selectedTime;
  appointmentFormEl.style.visibility = (state.selectedVisible) ? "visible" : "hidden";

  clearAppointmentsList();

  //get appointments for displayed date
  let appointmentsInDay = state.appointments.get(state.displayedDate.toDateString());
  if (appointmentsInDay !== undefined) {
    appointmentsInDay.forEach((value, key) => {
      if (value !== undefined) {
        document.getElementById("hour_" + key).innerHTML = key + "  " + value;
        document.getElementById("hour_" + key).classList.add("active");
      }
    });
  }
  for (let i = 0; i < 24; i++) {
    document.getElementById("hour_" + i)
      .classList.remove("list-group-item-dark");
  }
  document.getElementById("hour_" + state.selectedTime)
    .classList.add("list-group-item-dark");
}

/////////////////////////////////////////////////////
///  Event handlers
/////////////////////////////////////////////////////

//called when user clicks on an hour
const handleClickOnHour = function (event) {
  state = (0,_logic_js__WEBPACK_IMPORTED_MODULE_0__.selectSlot)(state, event.target.id.substring(5, event.target.id.length));
  updateUI(state);
  appointmentDescEl.focus();
}

//move to next date
const handleNext = function() {
  state = (0,_logic_js__WEBPACK_IMPORTED_MODULE_0__.addDaysToDate)(state, 1);
  updateUI(state);
}

//move to previous date
const handlePrevious = function() {
  state = (0,_logic_js__WEBPACK_IMPORTED_MODULE_0__.addDaysToDate)(state, -1);
  updateUI(state);
}

//select new date
const handleGoto = function() {
  let newDateTime = new Date(gotoDateEl.value);
  state = (0,_logic_js__WEBPACK_IMPORTED_MODULE_0__.updateDisplayedDate)(state, newDateTime);
  updateUI(state);
}

//save/update appointment
const handleSave = function() {
  const newDescr = appointmentDescEl.value;
  const dateTime = new Date(appointmentDateEl.value);
  const newDate = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.getDateOnly)(dateTime);
  const newTime = appointmentTimeEl.value;

  if ((0,_logic_js__WEBPACK_IMPORTED_MODULE_0__.slotAlreadyTaken)(state, newDate, newTime)
    && !((0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.areDatesEqual)(state.selectedDate, newDate) 
          && state.selectedTime == newTime)) {
    //ask user to overwrite existing entry
    let ret = confirm("Destination date and time not empty. Overwrite?");
    if (ret) {
      //insert entry to new location
      state = (0,_logic_js__WEBPACK_IMPORTED_MODULE_0__.updateAppointment)(state, newDescr, newDate, newTime);
      updateUI(state);
    }
  }
  else {
    //insert entry to new location
    state = (0,_logic_js__WEBPACK_IMPORTED_MODULE_0__.updateAppointment)(state, newDescr, newDate, newTime);
    updateUI(state);
  }
}

//delete appointment
const handleDelete = function() {
  const dateTime = new Date(appointmentDateEl.value);
  const date = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.getDateOnly)(dateTime);
  const time = parseInt(appointmentTimeEl.value);
  state = (0,_logic_js__WEBPACK_IMPORTED_MODULE_0__.deleteAppointment)(state, date, time);
  updateUI(state);
}

/////////////////////////////////////////////////////
///  Event listeners
/////////////////////////////////////////////////////

nextDateEl.addEventListener("click", handleNext);
previousDateEl.addEventListener("click", handlePrevious);
gotoDateEl.addEventListener("change", handleGoto);
saveEl.addEventListener("click", handleSave);
deleteEl.addEventListener("click", handleDelete);

/////////////////////////////////////////////////////
///  Startup
/////////////////////////////////////////////////////

let d = new Date();
let state = {
  appointments: new Map(),
  displayedDate: (0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.getDateOnly)(d),
  selectedDesc: "",
  selectedDate: (0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.getDateOnly)(d),
  selectedTime: 8,
  selectedVisible: false
};

createAppointmentList();
updateUI(state);

})();

/******/ })()
;