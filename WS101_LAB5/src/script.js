// Simulated backend data
let todos = [
    { id: 1, title: "Learn Fetch API" },
    { id: 2, title: "Build CRUD UI" }
];

// DOM elements
const todoForm = document.getElementById("todoForm");
const todoTitle = document.getElementById("todoTitle");
const todoList = document.getElementById("todoList");

// --- READ ---
function fetchTodos() {
    // Simulate a fetch GET request
    todoList.innerHTML = "";
    todos.forEach(todo => {
        const li = document.createElement("li");
        li.innerHTML = `
      <span>${todo.title}</span>
      <div>
        <button class="edit" onclick="editTodo(${todo.id})">Edit</button>
        <button onclick="deleteTodo(${todo.id})">Delete</button>
      </div>
    `;
        todoList.appendChild(li);
    });
}

// --- CREATE ---
todoForm.addEventListener("submit", e => {
    e.preventDefault();
    const newTodo = {
        id: Date.now(),
        title: todoTitle.value
    };
    todos.push(newTodo);
    todoTitle.value = "";
    fetchTodos();
});

// --- UPDATE ---
function editTodo(id) {
    const newTitle = prompt("Edit your task:");
    if (newTitle) {
        todos = todos.map(todo =>
            todo.id === id ? { ...todo, title: newTitle } : todo
        );
        fetchTodos();
    }
}

// --- DELETE ---
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    fetchTodos();
}

// Initialize list
fetchTodos();
