//get reference to elements
const redEl = document.getElementById("red");
const greenEl = document.getElementById("green");
const blueEl = document.getElementById("blue");
const panelEl = document.getElementById("panel");
const decEl = document.getElementById("dec");
const hexEl = document.getElementById("hex");

//function to calculate color
const calculateColor = function(){
  let red;
  let green;
  let blue;

  if(decEl.checked){
    //if decimal is checked, take value as is
    red = parseInt(redEl.value);
    green = parseInt(greenEl.value);
    blue = parseInt(blueEl.value);
  }
  else{
    //if hex is checked, convert from hex to dec
    red = parseInt(redEl.value, 16);
    green = parseInt(greenEl.value, 16);
    blue = parseInt(blueEl.value, 16);
  }

  //check for 0-255 range
  if(red < 0 || red > 255 || isNaN(red)
    || green < 0 || green > 255 || isNaN(green)
    || blue < 0 || blue > 255 || isNaN(blue)){

    panelEl.innerHTML = "Values should lie between 0 and 255 (0 and FF)";
    panelEl.style.backgroundColor = "white";
  }
  else{
    panelEl.innerHTML = "";
    //set background color
    panelEl.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
  }
}

//change event handler (radio button)
const toggleDecToHex = function(){
  if (decEl.checked){
    redEl.value = parseInt(redEl.value, 16);
    greenEl.value = parseInt(greenEl.value, 16);
    blueEl.value = parseInt(blueEl.value, 16);
  }
  else{
    let tmp = parseInt(redEl.value)
    redEl.value = tmp.toString(16);
    tmp = parseInt(greenEl.value)
    greenEl.value = tmp.toString(16);
    tmp = parseInt(blueEl.value);
    blueEl.value = tmp.toString(16);
  }
}

//register event handlers
redEl.addEventListener("keyup", calculateColor);
greenEl.addEventListener("keyup", calculateColor);
blueEl.addEventListener("keyup", calculateColor);

redEl.addEventListener("change", calculateColor);
greenEl.addEventListener("change", calculateColor);
blueEl.addEventListener("change", calculateColor);

decEl.addEventListener("change", toggleDecToHex);
hexEl.addEventListener("change", toggleDecToHex);

//perform first calculation (all values are 0 by default)
calculateColor();