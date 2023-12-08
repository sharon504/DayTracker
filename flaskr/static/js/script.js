function addItem() {
  let newItem = document.getElementById("newItem").value;
  if (newItem.trim() === "") {
    alert("Please enter a task.");
    return;
  }

  let todoList = document.getElementById("todoList");
  let li = document.createElement("li");
  let span = document.createElement("span");
  span.innerHTML = "❌";
  span.onclick = function () {
    this.parentElement.remove();
  };

  li.appendChild(span);
  li.appendChild(document.createTextNode(newItem));
  todoList.appendChild(li);
  document.getElementById("newItem").value = "";
}
const apiUrl = "http://127.0.0.1:5000/"; // Replace this with your backend API URL

// Function to fetch and display existing To-Do list items
async function getTodoList() {
  try {
    const response = await fetch(`${apiUrl}/todos`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = "";

    data.forEach((todo) => {
      const li = createTodoItem(todo);
      todoList.appendChild(li);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function to create a single To-Do list item
function createTodoItem(todo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerHTML = "❌";
  span.onclick = async function () {
    try {
      const response = await fetch(`${apiUrl}/todos/${todo.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      li.remove();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  li.appendChild(span);
  li.appendChild(document.createTextNode(todo.task));
  return li;
}

// Function to add a new item to the To-Do list
async function addItem() {
  const newItem = document.getElementById("newItem").value;
  if (newItem.trim() === "") {
    alert("Please enter a task.");
    return;
  }

  try {
    const response = await fetch(`${apiUrl}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: newItem }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const todoList = document.getElementById("todoList");
    const li = createTodoItem(data);
    todoList.appendChild(li);
    document.getElementById("newItem").value = "";
  } catch (error) {
    console.error("Error:", error);
  }
}

// Call getTodoList when the page loads to display existing To-Do list items
document.addEventListener("DOMContentLoaded", getTodoList);
