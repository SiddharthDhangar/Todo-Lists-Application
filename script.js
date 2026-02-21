// preventDefault: method of the Event interface tell the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be

const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUL = document.getElementById("todo-list");

// =======================
// Theme Switch Logic
// =======================

const themeSwitch = document.getElementById("theme-switch");

// Load saved theme when page loads
let darkMode = localStorage.getItem("darkmode");

if (darkMode === "active") {
  document.body.classList.add("darkmode");
}

// Toggle theme on button click
themeSwitch.addEventListener("click", () => {
  document.body.classList.toggle("darkmode");

  if (document.body.classList.contains("darkmode")) {
    localStorage.setItem("darkmode", "active");
  } else {
    localStorage.setItem("darkmode", null);
  }
});

let allTodos = getTodos();
console.log(allTodos);
updateTodoList();

todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText.length > 0) {
    const todoObject = {
      text: todoText,
      completed: false,
    };
    allTodos.push(todoObject);
    updateTodoList();
    saveTodos();
    todoInput.value = "";
  }
}

function updateTodoList() {
  todoListUL.innerHTML = "";
  allTodos.forEach((todoObject, todoIndex) => {
    todoItem = createTodoItem(todoObject, todoIndex);
    todoListUL.append(todoItem);
  });
}

function createTodoItem(todoObject, todoIndex) {
  let todoId = "todo-" + todoIndex;
  const todoLI = document.createElement("li");
  const todoText = todoObject.text;
  todoLI.className = "todo";
  todoLI.innerHTML = `
  <input type="checkbox" id=${todoId} />
          <label class="custom-checkbox" for=${todoId} >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="transparent"
            >
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
          </label>
          <label for=${todoId} class="todo-text">
            ${todoText}
          </label>
          <button class="edit-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="var(--secondary-color)"
            >
              <path
                d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"
              />
            </svg>
          </button>
          <button class="delete-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="var(--secondary-color)"
            >
              <path
                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
              />
            </svg>
          </button>
  `;

  const deleteButton = todoLI.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    deleteTodoItem(todoIndex);
  });

  const checkbox = todoLI.querySelector("input");
  checkbox.addEventListener("change", () => {
    allTodos[todoIndex].completed = checkbox.checked;
    saveTodos();
  });
  checkbox.checked = todoObject.completed;

  const editButton = todoLI.querySelector(".edit-button");

  editButton.addEventListener("click", () => {
    editTodoItem(todoIndex);
  });

  return todoLI;
}

function editTodoItem(todoIndex) {
  const newText = prompt("Edit your task:", allTodos[todoIndex].text);

  if (newText !== null && newText.trim() !== "") {
    allTodos[todoIndex].text = newText.trim();
    saveTodos();
    updateTodoList();
  }
}

function deleteTodoItem(todoIndex) {
  allTodos = allTodos.filter((_, i) => i !== todoIndex);
  saveTodos();
  updateTodoList();
}

function saveTodos() {
  const todoJson = JSON.stringify(allTodos);
  localStorage.setItem("Task", todoJson);
}

function getTodos() {
  const todos = localStorage.getItem("Task") || "[]";
  return JSON.parse(todos);
}
