const API_BASE = "http://localhost:8080/api/todos";

document.getElementById("loadTodos").addEventListener("click", loadTodos);
document.getElementById("addTodo").addEventListener("click", addTodo);

async function loadTodos() {
    const username = document.getElementById("username").value.trim();
    if (!username) return alert("Please enter a username!");

    try {
        const response = await fetch(`${API_BASE}?username=${username}`);
        if (!response.ok) throw new Error("Failed to load todos.");

        const todos = await response.json();
        renderTodos(todos);
    } catch (err) {
        console.error(err);
        alert("Error loading todos. Make sure the backend is running.");
    }
}

async function addTodo() {
    const username = document.getElementById("username").value.trim();
    const description = document.getElementById("description").value.trim();
    const targetDate = document.getElementById("dueDate").value;
    const done = document.getElementById("done").checked;

    if (!username) return alert("Please enter a username first!");
    if (!description) return alert("Description cannot be empty.");

    const todo = { username, description, targetDate, done };

    try {
        const response = await fetch(API_BASE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(todo),
        });

        if (!response.ok) throw new Error("Failed to add todo.");
        await loadTodos();

        document.getElementById("description").value = "";
        document.getElementById("dueDate").value = "";
        document.getElementById("done").checked = false;
    } catch (err) {
        console.error(err);
        alert("Error adding todo.");
    }
}

async function editTodo(id, oldDescription) {
    const newDesc = prompt("Edit description:", oldDescription);
    if (newDesc === null) return;

    try {
        const response = await fetch(`${API_BASE}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ description: newDesc }),
        });

        if (!response.ok) throw new Error("Failed to update todo.");
        await loadTodos();
    } catch (err) {
        console.error(err);
        alert("Error updating todo.");
    }
}

async function toggleDone(id, done) {
    try {
        const response = await fetch(`${API_BASE}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ done: !done }),
        });

        if (!response.ok) throw new Error("Failed to update todo status.");
        await loadTodos();
    } catch (err) {
        console.error(err);
        alert("Error toggling todo.");
    }
}

async function deleteTodo(id) {
    if (!confirm("Delete this todo?")) return;

    try {
        const response = await fetch(`${API_BASE}/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete todo.");
        await loadTodos();
    } catch (err) {
        console.error(err);
        alert("Error deleting todo.");
    }
}

function renderTodos(todos) {
    const list = document.getElementById("todoList");
    list.innerHTML = "";

    todos.forEach(todo => {
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = `${todo.description} - ${todo.targetDate || "No date"}`;
        if (todo.done) span.style.textDecoration = "line-through";

        const actions = document.createElement("div");
        actions.classList.add("todo-actions");

        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = todo.done ? "Undo" : "Done";
        toggleBtn.onclick = () => toggleDone(todo.id, todo.done);

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editTodo(todo.id, todo.description);

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.onclick = () => deleteTodo(todo.id);

        actions.append(toggleBtn, editBtn, delBtn);
        li.append(span, actions);
        list.appendChild(li);
    });
}
