const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const gender = document.getElementsByName("gender");
const zip = document.getElementById("zip");
const state = document.getElementById("state");
const address = document.getElementById("address");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const checks = document.getElementsByName("checks");
const password = document.getElementById("password");
const confirm = document.getElementById("confirm");
const comments = document.getElementById("comments");

const fnameError = document.getElementById("fnameError");
const lnameError = document.getElementById("lnameError");
const genderError = document.getElementsByName("genderError");
const zipError = document.getElementById("zipError");
const stateError = document.getElementById("stateError");
const addressError = document.getElementById("addressError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const checksError = document.getElementsByName("checksError");
const passwordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmError");

const errorSpans = document.getElementsByClassName("error");

const validate = function() {
  let result = true;

  //remove previous errors
  for(let i=0; i<errorSpans.length; i++){
    errorSpans[i].innerHTML = "";
  }

  if(fname.value == ""){
    fnameError.innerHTML = "First name is required";
    result = false;
  } 
  
  if(lname.value == ""){
    lnameError.innerHTML = "Last name is required";
    result = false;
  } 

  let found = false;
  for (let i = 0; i < gender.length; i++) {
    if (gender[i].checked === true)
      found = true;
  }
  if(!found){
    genderError.innerHTML = "Gender is required";
    result = false;
  }

  if (zip.value == "") {
    zipError.innerHTML = "ZIP is required";
    result = false;
  }
  else if (zip.value.length != 5 || isNaN(zip.value)) {
    zipError.innerHTML = "ZIP is not correct";
    result = false;
  }

  if (state.value === "CO") {
    if(address.value == ""){
      addressError.innerHTML = "Address is required for Colorado";
      result = false;
    } 
  }

  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email.value.match(emailRegex)){
    emailError.innerHTML = "Email is not correct";
    result = false;
  }

  const phoneRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  if (!phone.value.match(phoneRegex)){
    phoneError.innerHTML = "Phone formats: (123)456-7890, 1234567890 or 123-456-7890";
    result = false;
  }

  if(checks[0].checked === false){
    acceptError.innerHTML = "You should agree to the terms";
    result = false;
  }

  if(password.value.length < 8){
    passwordError.innerHTML = "Password should contain at least 8 characters";
    result = false;
  }
  if(confirm.value !== password.value){
    confirmError.innerHTML = "Password and Confirm Password do not match";
    result = false;
  }

  return result;
}