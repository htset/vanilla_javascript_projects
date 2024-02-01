const toggleSettingsEl = document.getElementById("toggleSettings");
const setAlarmEl = document.getElementById("setAlarm");
const cancelAlarmEl = document.getElementById("cancelAlarm");
const clockEl = document.getElementById("clockDisplay");
const settingsEl = document.getElementById("settings");

const timeHandler = function (){
  let currentTime = new Date();
  let hours = currentTime.getHours() < 10? 
    "0"+currentTime.getHours() : currentTime.getHours();
  let minutes = currentTime.getMinutes() < 10? 
    "0" + currentTime.getMinutes() : currentTime.getMinutes();
  let seconds = currentTime.getSeconds() < 10? 
    "0" + currentTime.getSeconds() : currentTime.getSeconds();
  clockEl.innerHTML = `${hours}:${minutes}:${seconds}`;
}

const toggleSettings = function(){
  if (settingsEl.classList.contains("fadeOut")) {
    settingsEl.classList.remove("fadeOut");
  } 
  else {
    settingsEl.classList.add("fadeOut");
  }
}

const setAlarm = function(){
  if(document.getElementById("alarm").value != ''){
    let currentTime = new Date();
    let selectedTime = document.getElementById("alarm").value.split(":");
    let alarmTime;
    if(selectedTime[0] < currentTime.getHours() 
      || (selectedTime[0] == currentTime.getHours() 
          && selectedTime[1] < currentTime.getMinutes()))
      alarmTime = new Date(currentTime.getFullYear(), 
                            currentTime.getMonth(), 
                            currentTime.getDate()+1, 
                            selectedTime[0], 
                            selectedTime[1], 
                            0);
    else
      alarmTime = new Date(currentTime.getFullYear(), 
                            currentTime.getMonth(), 
                            currentTime.getDate(), 
                            selectedTime[0], 
                            selectedTime[1], 
                            0);
      
    let duration = alarmTime.getTime() - currentTime.getTime();
    clearTimeout(alarm);
    alarm = setTimeout(alarmHandler, duration);  
  }
}

const cancelAlarm = function(){
  clearTimeout(alarm);
  let alarmTime = document.getElementById("alarm").value = '';
}

const alarmHandler = function(){
  alert("Rrrrriingggggg!");
}

toggleSettingsEl.addEventListener("click", toggleSettings);
setAlarmEl.addEventListener("click", setAlarm);
cancelAlarmEl.addEventListener("click", cancelAlarm);

let alarm = '';
let timer = setInterval(timeHandler, 1000);
