QUnit.module('Helpers testing', function() {
  QUnit.test('When dates are not equal - areDatesEqual() returns false', function(assert) {
    let d1 = new Date(2023, 12, 31);
    let d2 = new Date(2023, 12, 30);

    assert.equal(areDatesEqual(d1, d2), false);
  });

  QUnit.test('When dates are equal - areDatesEqual() returns true', function(assert) {
    let d1 = new Date(2023, 12, 31);
    let d2 = new Date(2023, 12, 31);

    assert.equal(areDatesEqual(d1, d2), true);
  });
});

QUnit.module('Logic testing', function() {
  QUnit.test('When appointment already exists at specific date and time - slotAlreadyTaken() returns true', function(assert) {
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

    assert.equal(slotAlreadyTaken(state, d, 10), true);
  });

  QUnit.test('When appointment does not exist at specific date and time - slotAlreadyTaken() returns false', function(assert) {
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

    assert.equal(slotAlreadyTaken(state, d, 9), false);
  });  

  QUnit.test('When updating existing appointment to a new date - the existing one is removed', function(assert) {
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
    assert.equal(newState.appointments.get(d2.toDateString()).get(7), "test");
    assert.equal(newState.appointments.get(d.toDateString()).has(10), false);
  });  

  QUnit.test('When deleting appointment - the appointment is removed', function(assert) {
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
    assert.equal(newState.appointments.get(d.toDateString()).has(10), false);
  });
  
  QUnit.test('When user clicks on an hour slot - the right panel is updated', function(assert) {
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
    assert.equal(newState.selectedDesc, "test");
    assert.equal(areDatesEqual(newState.selectedDate, getDateOnly(d)), true);
    assert.equal(newState.selectedTime, 10);
  });    
  
});