import { areDatesEqual, getDateOnly } from '../src/helpers.js';
import {
  slotAlreadyTaken, 
  updateAppointment, 
  deleteAppointment,
  selectSlot
} from '../src/logic.js';

describe("Logic testing", () => {
  it("When appointment already exists at specific date and time - slotAlreadyTaken() returns true", () => {
    let d = new Date(2024, 1, 10);
    let map = new Map();
    let day = new Map();
    day.set(10, "test");
    map.set(d.toDateString(), day);
    let state = {
      appointments: map,
      displayedDate: getDateOnly(d),
      selectedDesc: "",
      selectedDate: getDateOnly(d),
      selectedTime: 8,
      selectedVisible: false
    };

    expect(slotAlreadyTaken(state, d, 10)).toBeTruthy();
  });

  it("When appointment does not exist at specific date and time - slotAlreadyTaken() returns false", () => {
    let d = new Date(2024, 1, 10);
    let map = new Map();
    let day = new Map();
    day.set(10, "test");
    map.set(d.toDateString(), day);
    let state = {
      appointments: map,
      displayedDate: getDateOnly(d),
      selectedDesc: "",
      selectedDate: getDateOnly(d),
      selectedTime: 8,
      selectedVisible: false
    };

    expect(slotAlreadyTaken(state, d, 9)).toBeFalsy();
  });

  it("When updating existing appointment to a new date - the existing one is removed'", () => {
    let d = new Date(2024, 1, 10);
    let d2 = new Date(2024, 1, 11);
    let map = new Map();
    let day = new Map();
    day.set(10, "test");
    map.set(d.toDateString(), day);
    let state = {
      appointments: map,
      displayedDate: getDateOnly(d),
      selectedDesc: "",
      selectedDate: getDateOnly(d),
      selectedTime: 10,
      selectedVisible: false
    };

    let newState = updateAppointment(state, "test", d2, 7);
    expect(newState.appointments.get(d2.toDateString()).get(7)).toBe("test");
    expect(newState.appointments.get(d.toDateString()).has(10)).toBeFalsy();
  });

  it("When deleting appointment - the appointment is removed", () => {
    let d = new Date(2024, 1, 10);
    let map = new Map();
    let day = new Map();
    day.set(10, "test");
    map.set(d.toDateString(), day);
    let state = {
      appointments: map,
      displayedDate: getDateOnly(d),
      selectedDesc: "",
      selectedDate: getDateOnly(d),
      selectedTime: 10,
      selectedVisible: false
    };

    let newState = deleteAppointment(state, d, 10);
    expect(newState.appointments.get(d.toDateString()).has(10)).toBeFalsy();
  });

  it("When user clicks on an hour slot - the right panel is updated", () => {
    let d = new Date(2024, 1, 10);
    let map = new Map();
    let day = new Map();
    day.set(10, "test");
    map.set(d.toDateString(), day);
    let state = {
      appointments: map,
      displayedDate: getDateOnly(d),
      selectedDesc: "",
      selectedDate: getDateOnly(d),
      selectedTime: 8,
      selectedVisible: false
    };

    let newState = selectSlot(state, 10);
    expect(newState.selectedDesc).toBe("test");
    expect(areDatesEqual(newState.selectedDate, getDateOnly(d))).toBeTruthy();
    expect(newState.selectedTime).toBe(10);
  });

});
