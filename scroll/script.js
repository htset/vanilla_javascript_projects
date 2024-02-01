const productsEl = document.querySelector('.products');
const spinnerEl = document.querySelector('.spinner-border');

const fetchProducts = async (limit, skip) => {
  const URL = `https://dummyjson.com/products/?limit=${limit}&skip=${skip}`;
  const response = await fetch(URL);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return await response.json();
}

const renderProducts = (products) => {
  products.forEach(product => {
    const productEl = document.createElement('div');
    productEl.classList.add('card');
    productEl.style = "width: 25rem;"

    productEl.innerHTML = `
      <img src="${product.thumbnail}" 
        class="card-img-top img-thumbnail" style="height:300px">
        <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">${product.description}</p>`;

    productsEl.appendChild(productEl);
  });
};

const loadProducts = async (page, limit) => {
  showSpinner();
  try {
    if (skip < total || total == 0) {
      const response = await fetchProducts(page, limit);
      renderProducts(response.products);
      total = response.total;
    }
  }
  catch (error) {
    console.log(error.message);
  }
  hideSpinner();
};

const hideSpinner = () => {
  spinnerEl.style.visibility = "hidden";
};

const showSpinner = () => {
  spinnerEl.style.visibility = "visible";
};

const handleScroll = () => {
  if (timerRunning)
    return;
  timerRunning = true;

  setTimeout(() => {
    const docEl = document.documentElement;

    if (docEl.scrollTop + docEl.clientHeight >= docEl.scrollHeight - 10) {
      skip += limit;
      loadProducts(limit, skip);
    }
    timerRunning = false;
  }, 1000);
};

window.addEventListener('scroll', handleScroll);

const limit = 12;
let total = 0;
let skip = 0;
var timerRunning;

loadProducts(limit, skip);