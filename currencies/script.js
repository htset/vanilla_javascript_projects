const baseCurrencyEl = document.querySelector(".baseCurrency");
const currenciesEl = document.querySelector('.list');
const addEl = document.querySelector(".add");
const calculateEl = document.querySelector(".calculate");
const resultEl = document.querySelector(".result");

const fetchSupportedCurrencies = async () => {
  const URL = `https://api.freecurrencyapi.com/v1/currencies?apikey=XXXXX`;
  let json;
  try {
    const response = await fetch(URL);
    json = await response.json();
    if (!response.ok) {
      alert(`Error ${response.status}: ${json.message}`);
      return null;
    }
    if (json.error !== undefined) {
      alert(`Error: ${json.error.info}`);
      return null;
    }
  }
  catch (error) {
    if (error instanceof SyntaxError) {
      alert("The returned data was invalid");
      return null;
    }
    else {
      alert("There was an error with the request");
      return null;
    }
  }
  return json;
}

const fetchQuotes = async (baseCurrency) => {
  const URL = `https://api.freecurrencyapi.com/v1/latest?base_currency=${baseCurrency}&apikey=XXXXX`;
  let json;
  try {
    const response = await fetch(URL);
    json = await response.json();
    if (!response.ok) {
      alert(`Error ${response.status}: ${json.message}`);
      return null;
    }
    if (json.error !== undefined) {
      alert(`Error: ${json.error.info}`);
      return null;
    }
  }
  catch (error) {
    if (error instanceof SyntaxError) {
      alert("The returned data was invalid");
      return null;
    }
    else {
      alert("There was an error with the request");
      return null;
    }
  }
  return json;
}

const loadSupportedCurrencies = async () => {
  const response = await fetchSupportedCurrencies();
  if (response !== null) {
    supportedCurencies = response.data;

    Object.keys(supportedCurencies).forEach((key) => {
      let option = document.createElement("option");
      option.value = key;
      option.innerHTML = key + "-" + supportedCurencies[key].name;
      baseCurrencyEl.appendChild(option);
    });
  }
  else {
    supportedCurencies = null;
  }
}

const addLine = () => {
  if (supportedCurencies !== null) {
    let rowEl = document.createElement("div");
    rowEl.classList.add("row");
    rowEl.classList.add("border");
    rowEl.classList.add("bg-light");
    rowEl.classList.add("currency-row");

    let divEl1 = document.createElement("div");
    divEl1.classList.add("col-md-2");
    divEl1.classList.add("m-2");
    let inputEl = document.createElement("input");
    inputEl.type = "text";
    inputEl.classList.add("col-md-12");
    divEl1.appendChild(inputEl);

    let divEl2 = document.createElement("div");
    divEl2.classList.add("col-md-4");
    divEl2.classList.add("m-2");
    let selectEl = document.createElement("select");
    selectEl.classList.add("col-md-12");
    Object.keys(supportedCurencies).forEach((key) => {
      let option = document.createElement("option");
      option.value = key;
      option.innerHTML = key + "-" + supportedCurencies[key].name;
      selectEl.appendChild(option);
    });
    divEl2.appendChild(selectEl);

    let divEl3 = document.createElement("div");
    divEl3.classList.add("col-md-2");
    divEl3.classList.add("m-2");
    let deleteEl = document.createElement("button");
    deleteEl.innerHTML = "Remove";
    deleteEl.addEventListener("click", (e) => {
      e.target.parentElement.parentElement.remove();
    });
    deleteEl.classList.add("col-md-12");
    divEl3.appendChild(deleteEl);

    rowEl.appendChild(divEl1);
    rowEl.appendChild(divEl2);
    rowEl.appendChild(divEl3);

    currenciesEl.appendChild(rowEl);
  }
}

const calculate = (num, selectedCurrency, baseCurrency, quotes) => {
  if (selectedCurrency !== baseCurrency) {
    const rate = quotes.data[selectedCurrency]
    return num / rate;
  }
  return num;
}

Number.prototype.round = function (places) {
  return +(Math.round(this + "e+" + places) + "e-" + places);
}

const calculatePortfolio = () => {
  if (supportedCurencies !== null) {
    //first get updated currency quotes
    const baseCurrency = baseCurrencyEl.value;
    fetchQuotes(baseCurrency)
      .then((quotes) => {
        if (quotes !== null) {
          const portfolioItemsEl = document.querySelectorAll(".currency-row");
          let total = 0;
          portfolioItemsEl.forEach((item) => {
            const amount = item.querySelector("input[type=text]").value;
            const selectedCurrency 
              = item.querySelectorAll('option:checked')[0].value

            let num = parseFloat(amount);
            if (!isNaN(num)) {
              let calculatedAmount 
                = calculate(num, selectedCurrency, baseCurrency, quotes);
              total += calculatedAmount.round(2);
            }
          });
          resultEl.innerHTML = total + " " + baseCurrency;
        }
      });
  }
}

calculateEl.addEventListener("click", calculatePortfolio)
addEl.addEventListener("click", addLine);
let supportedCurencies;

loadSupportedCurrencies()
  .then(() => {
    addLine();
  });
