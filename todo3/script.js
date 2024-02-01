const formEl = document.getElementById("form");
const itemsEl = document.getElementById("items");
const textEl = document.getElementById("text");

let draggedItem, draggedItemID;

//re-create unordered list based on the array of tasks
const renderList = () => {
  //first delete the existing entries
  itemsEl.innerHTML = '';

  for (let id in tasks) {
    //create new <li> element
    const item = document.createElement("li");
    //add TextNode inside <li>
    const textnode = document.createTextNode(tasks[id]);
    item.appendChild(textnode);

    //set element attributes
    item.setAttribute("class", "list-group-item");
    item.setAttribute("name", "list");
    item.setAttribute("draggable", "true");
    item.setAttribute("data-id", id); //custom attribute

    //add Delete button to <li>
    let button = document.createElement("button");
    button.innerHTML = "delete";
    button.style.float = "right";
    button.addEventListener("click", deleteTodo);
    item.appendChild(button);

    //add <li> to <ul> list
    itemsEl.appendChild(item);
  }
}

const deleteTodo = (e) => {
  //get the index of the element via the data-id custom attribute
  const targetID = e.target.parentNode.getAttribute("data-id");
  //remove task from array
  tasks.splice(targetID, 1);
  renderList();
  //replace modified array in local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//called when dragging starts
const handleDragStart = (e) => {
  draggedItem = e.target;
  //keep the id of the moved item in a variable
  draggedItemID = e.target.getAttribute("data-id");
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
    //get the id of the list item over which the dragged item was dropped
    let targetId = parseInt(e.target.getAttribute("data-id"));
    //removed the dragged item id from the array
    let taskText = tasks.splice(draggedItemID, 1);

    if (e.clientY > e.target.getBoundingClientRect().top + (e.target.offsetHeight / 2)) {
      if (targetId < draggedItemID) {
        //create new tasks array while inserting the dragged item
        tasks = [
          ...tasks.slice(0, targetId + 1),
          taskText[0],
          ...tasks.slice(targetId + 1)
        ];
      }
      else {
        tasks = [
          ...tasks.slice(0, targetId),
          taskText[0],
          ...tasks.slice(targetId)
        ];
      }
    }
    else {
      if (targetId < draggedItemID) {
        tasks = [
          ...tasks.slice(0, targetId),
          taskText[0],
          ...tasks.slice(targetId)
        ];
      }
      else {
        tasks = [
          ...tasks.slice(0, targetId - 1),
          taskText[0],
          ...tasks.slice(targetId - 1)
        ];
      }
    }
  }
  renderList();
  //replace modified array in local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
  draggedItem = null;
}

const handleSubmit = (e) => {
  e.preventDefault();
  //insert task text into array
  tasks.push(text.value);
  renderList();
  //replace modified array in local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
  //empty text box
  text.value = '';
}

//attach event listeners
itemsEl.addEventListener("dragstart", handleDragStart);
itemsEl.addEventListener("dragover", handleDragOver);
itemsEl.addEventListener("drop", handleDrop);
formEl.addEventListener("submit", handleSubmit);

//startup
let tasks = JSON.parse(localStorage.getItem("tasks"));
if (tasks == undefined)
  tasks = [];
else
  renderList();



