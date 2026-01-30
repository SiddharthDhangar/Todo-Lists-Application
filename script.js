const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUL = document.getElementById("todo-list");

let todosArray = getTodos();
updateTodoList();

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodos();
});

function addTodos() {
  const todoText = todoInput.value.trim();
  if (todoText.length > 0) {
    let todosObject = {
      text: todoText,
      completed: false,
    };
    todosArray.push(todosObject);
    updateTodoList();
    saveTodos();
  }
  todoInput.value = "";
}

function updateTodoList() {
  todoListUL.innerHTML = "";
  todosArray.forEach((todoText, todoIndex) => {
    const todoItem = createTodoItem(todoText, todoIndex);
    todoListUL.append(todoItem);
  });
}

function createTodoItem(todoText, todoIndex) {
  const todoLI = document.createElement("li");
  todoLI.className = "todo";
  let todoID = "todo-" + todoIndex;
  let todoListText = todoText.text;
  todoLI.innerHTML = ` <input type="checkbox" id="${todoID}" />
          <label class="custom-checkbox" for="${todoID}">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="transparent"
            >
              <path d="M400-304 240-464l56-56 104 104 264-264 56 56-320 320Z" />
            </svg>
          </label>
          <label for="${todoID}" class="todo-text">
            ${todoListText}
          </label>
          <button class="delete-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="var(--secondary-color)"
            >
              <path
                d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"
              />
            </svg>
          </button>`;

  const deleteButton = todoLI.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    deleteTodoButton(todoIndex);
  });

  const checkbox = todoLI.querySelector("input");
  checkbox.addEventListener("change", () => {
    todosArray[todoIndex].completed = checkbox.checked;
    saveTodos();
  });
  checkbox.checked = todoText.completed;
  return todoLI;
}

function deleteTodoButton(todoIndex) {
  todosArray = todosArray.filter((_, i) => i !== todoIndex);

  saveTodos();
  updateTodoList();
}

function saveTodos() {
  const TodosJson = JSON.stringify(todosArray);
  localStorage.setItem("todoLists", TodosJson);
}

function getTodos() {
  const todoLists = localStorage.getItem("todoLists") || "[]";
  return JSON.parse(todoLists);
}

// DarkMode switch

let darkmode = localStorage.getItem("darkmode");

const themeSwitch = document.getElementById("theme-switch");

const enableDarkmode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
};

const disableDarkmode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", null);
};

if (darkmode === "active") enableDarkmode();

themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem("darkmode");
  darkmode !== "active" ? enableDarkmode() : disableDarkmode();
});
