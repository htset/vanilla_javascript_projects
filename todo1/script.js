const formEl = document.getElementById("form");
const itemsEl = document.getElementById("items");
const textEl = document.getElementById("text");

const handleSubmit = (e) => {
  //create new <li> element
  const item = document.createElement("li");
  //add TextNode inside <li>
  const textnode = document.createTextNode(textEl.value);
  item.appendChild(textnode);

  //set element attributes
  item.setAttribute("class", "list-group-item");
  item.setAttribute("name", "list");
 
  //add Delete button to <li>
  const button = document.createElement("button");
  button.innerHTML = "delete";
  button.style.float = "right";
  button.addEventListener("click", deleteTodo);
  item.appendChild(button);

  //add <li> to <ul> list
  itemsEl.appendChild(item);

  //empty text box
  textEl.value = '';

  //prevent form submission
  e.preventDefault();
}

const deleteTodo = (e) => {
  //find the parent element of the button (--> the <li> element)
  //and remove it from the DOM
  e.target.parentElement.remove();
}

//attach event listener
formEl.addEventListener("submit", handleSubmit);



