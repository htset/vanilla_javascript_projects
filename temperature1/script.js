function f2c(){
  //get access to the text box elements
  const celsiusEl = document.getElementById("celsius");
  const fahrenheitEl = document.getElementById("fahrenheit");

  //parse text into number
  const fahrenheit = parseFloat(fahrenheitEl.value);

  //check if parsed value is indeed a number
  if(isNaN(fahrenheit)){
    alert("The Fahrenheit value is not correct");
    celsiusEl.value = "";
  }
  else{
    const celsius = (fahrenheit - 32) * 5 / 9;
    //write the result into the celsius text box
    celsiusEl.value = celsius.toFixed(2);  
  }
}

function c2f(){
  //get access to the text box elements
  const celsiusEl = document.getElementById("celsius");
  const fahrenheitEl = document.getElementById("fahrenheit");

  //parse text into number
  const celsius = parseFloat(celsiusEl.value);

  //check if parsed value is indeed a number
  if(isNaN(celsius)){    
    alert("The Celsius value is not correct");
    fahrenheitEl.value = "";
  }  
  else{
    const fahrenheit = (celsius * 9 / 5) + 32;
    //write the result into the fahrenheit text box
    fahrenheitEl.value = fahrenheit.toFixed(2);
  }
}