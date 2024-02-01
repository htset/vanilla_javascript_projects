const formEl = document.getElementById("form");
const itemsEl = document.getElementById("items");
const textEl = document.getElementById("text");

let draggedItem;

const handleSubmit = (e) => {
  //create new <li> element
  const item = document.createElement("li");
  //add TextNode inside <li>
  const textnode = document.createTextNode(textEl.value);
  item.appendChild(textnode);

  //set element attributes
  item.setAttribute("class", "list-group-item");
  item.setAttribute("name", "list");
  item.setAttribute("draggable", "true");

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

//called when dragging starts
const handleDragStart = (e) => {
  draggedItem = e.target;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', draggedItem.innerHTML);
}

//called when the item is dragged over another item
const handleDragOver = (e) => {
  e.preventDefault();
}

//called when the item is dropped
const handleDrop = (e) => {
  e.preventDefault();
  //check whether it will be placed before or after the target element
  if (e.target !== draggedItem && e.target.classList.contains('list-group-item')) {
    if (e.clientY > e.target.getBoundingClientRect().top + (e.target.offsetHeight / 2)) {
      //drop it after the item --> before the next sibling
      e.target.parentNode.insertBefore(draggedItem, e.target.nextSibling);
    }
    else {
      //drop it before the item
      e.target.parentNode.insertBefore(draggedItem, e.target);
    }
  }
  draggedItem = null;
}

//attach event listeners
itemsEl.addEventListener("dragstart", handleDragStart);
itemsEl.addEventListener("dragover", handleDragOver);
itemsEl.addEventListener("drop", handleDrop);
formEl.addEventListener("submit",handleSubmit);
