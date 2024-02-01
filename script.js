const form = document.getElementById('form');
const textInput = document.querySelector('.text-input');
const todoListElement = document.getElementById('todos');
const remainingCount = document.getElementById('remaining-count');

getTodosFromLocalStorage();

form.addEventListener('submit', (e) => {
    // we don't want default action of form being submitted
    e.preventDefault();
    addTodo();
});

function getTodosFromLocalStorage() {
    const allTodos = JSON.parse(localStorage.getItem('todos'));

    if (allTodos) {
        allTodos.forEach((todo) => {
            addTodo(todo);
        });
    }
}

function addTodo(todo) {
    let todoText = textInput.value;

    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const todoElement = document.createElement("li");

        if (todo && todo.completed) {
            todoElement.classList.add("completed");
        }

        todoElement.innerText = todoText;

        todoElement.addEventListener("click", () => {
            todoElement.classList.toggle("completed");
            updateLocalStorage();
        });

        todoElement.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            todoElement.remove();
            updateLocalStorage();
        });

        todoListElement.appendChild(todoElement);
        textInput.value = "";
        updateLocalStorage();
    }
}

function updateLocalStorage() {
    const allTodoElements = document.querySelectorAll("li");
    const todoList = [];
    let remainingTodo = 0;

    allTodoElements.forEach((todoElement) => {
        if (!todoElement.classList.contains("completed")) {
            remainingTodo++;
        }
        todoList.push({
            text: todoElement.innerText,
            completed: todoElement.classList.contains("completed"),
        });
    });

    localStorage.setItem("todos", JSON.stringify(todoList));
    remainingCount.innerText = remainingTodo + " todos remaining / " + todoList.length + " todos total";
}

const toggle = document.getElementById('toggle');
const todos = document.getElementById('todos');

toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    todos.classList.toggle('dark');

    if (document.body.classList.contains('dark')) {
        toggle.innerText = '🌞';
    }
    else {
        toggle.innerText = '🌛';
    }
})