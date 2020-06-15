const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", removeCheck);
filterOption.addEventListener("click", filterTodo);

function addTodo(event) {
  event.preventDefault();
  // prevent from from submiting
  if (todoInput.value === "") {
    return;
  }
  createToDoItems(true);
  //clear input value
  todoInput.value = "";
}

function removeCheck(e) {
  const item = e.target;
  // delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    // wait to the animation to end and then remove the item
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}
let todos;
function checkStorage() {
  // check if i already have things in there
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}
function saveLocalTodos(todo) {
  checkStorage();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  checkStorage();
  createToDoItems(false);
}

function createToDoItems(isAddingToDoItem) {
  if (isAddingToDoItem) {
    // creating new div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //creting new li and appendting it to the div
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // add todo to local stroage
    saveLocalTodos(todoInput.value);
    // check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // trash button
    const TrashdButton = document.createElement("button");
    TrashdButton.innerHTML = '<i class = "fas fa-trash"></i>';
    TrashdButton.classList.add("trash-btn");
    todoDiv.appendChild(TrashdButton);
    // append to list
    todoList.appendChild(todoDiv);
  } else {
    todos.forEach((todo) => {
      // creating new div
      todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      //creting new li and appendting it to the div
      newTodo = document.createElement("li");
      newTodo.innerText = todo;
      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);
      // check mark button
      completedButton = document.createElement("button");
      completedButton.innerHTML = '<i class = "fas fa-check"></i>';
      completedButton.classList.add("complete-btn");
      todoDiv.appendChild(completedButton);

      // trash button
      TrashdButton = document.createElement("button");
      TrashdButton.innerHTML = '<i class = "fas fa-trash"></i>';
      TrashdButton.classList.add("trash-btn");
      todoDiv.appendChild(TrashdButton);
      // append to list
      todoList.appendChild(todoDiv);
    });
  }
}

function removeLocalTodos(todo) {
  // the todo is the div of the li
  checkStorage();

  //finding the index from the list to remove
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  // the first poisitin in the splice is which element to remove and the second is how many
  localStorage.setItem("todos", JSON.stringify(todos));
}
