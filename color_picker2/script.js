//get reference to elements
const redRange = document.getElementById("redRange");
const greenRange = document.getElementById("greenRange");
const blueRange = document.getElementById("blueRange");
const redText = document.getElementById("redText");
const greenText = document.getElementById("greenText");
const blueText = document.getElementById("blueText");
const panelEl = document.getElementById("panel");
const decEl = document.getElementById("dec");
const hexEl = document.getElementById("hex");

//declare and initialize variables
let red = 128;
let green = 128;
let blue = 128;

//function to calculate color from the sliders
const calculateColorFromRange = function(){
  //get values from sliders into the color variables
  red = parseInt(redRange.value);
  green = parseInt(greenRange.value);
  blue = parseInt(blueRange.value);

  //update text boxes
  if(decEl.checked){
    redText.value = red;
    greenText.value = green;
    blueText.value = blue;  
  }
  else{
    redText.value = red.toString(16);
    greenText.value = green.toString(16);
    blueText.value = blue.toString(16);
  }

  if(red < 0 || red > 255 || isNaN(red)
    || green < 0 || green > 255 || isNaN(green)
    || blue < 0 || blue > 255 || isNaN(blue)){

    panelEl.innerHTML = "Values should lie between 0 and 255 (0 and FF)";
    panelEl.style.backgroundColor = "white";
  }
  else{
    panelEl.innerHTML = "";
    panelEl.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
  }
}

//function to calculate color from the text boxes
const calculateColorFromText = function(){
  //get values from text boxes into the color variables
  if(decEl.checked){
    red = parseInt(redText.value);
    green = parseInt(greenText.value);
    blue = parseInt(blueText.value);
  }
  else{
    red = parseInt(redText.value, 16);
    green = parseInt(greenText.value, 16);
    blue = parseInt(blueText.value, 16);
  }

  if(red < 0 || red > 255 || isNaN(red)
    || green < 0 || green > 255 || isNaN(green)
    || blue < 0 || blue > 255 || isNaN(blue)){

    panelEl.innerHTML = "Values should lie between 0 and 255 (0 and FF)";
    panelEl.style.backgroundColor = "white";
  }
  else{
    panelEl.innerHTML = "";
    panelEl.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
  }

  //update sliders
  redRange.value = red;
  greenRange.value = green;
  blueRange.value = blue;
}

//change event handler (radio button)
const toggleDecToHex = function(){
  if(decEl.checked){
    redText.value = red;
    greenText.value = green;
    blueText.value = blue;  
  }
  else{
    redText.value = red.toString(16);
    greenText.value = green.toString(16);
    blueText.value = blue.toString(16);
  }
}

//register event handlers
redText.addEventListener("keyup", calculateColorFromText);
greenText.addEventListener("keyup", calculateColorFromText);
blueText.addEventListener("keyup", calculateColorFromText);

redRange.addEventListener("change", calculateColorFromRange);
greenRange.addEventListener("change", calculateColorFromRange);
blueRange.addEventListener("change", calculateColorFromRange);

decEl.addEventListener("change", toggleDecToHex);
hexEl.addEventListener("change", toggleDecToHex);

//perform first calculation
calculateColorFromRange();

