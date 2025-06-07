let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let isDarkMode = JSON.parse(localStorage.getItem("darkMode")) || false;

const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const emptyMessage = document.getElementById("emptyMessage");
const clearAllBtn = document.getElementById("clearAllBtn");
const themeToggle = document.getElementById("themeToggle");

function applyTheme() {
  document.body.classList.toggle("dark-mode", isDarkMode);
  themeToggle.textContent = isDarkMode ? "🌞" : "🌙";
  localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
}

function renderTasks() {
  taskList.innerHTML = "";
  emptyMessage.style.display = tasks.length ? "none" : "block";
  clearAllBtn.style.display = tasks.length ? "inline-block" : "none";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = task.text;

    const btnGroup = document.createElement("div");
    btnGroup.className = "task-buttons";

    const toggleBtn = document.createElement("button");
    toggleBtn.innerHTML = task.completed ? "✅" : "✔️";
    toggleBtn.title = task.completed ? "Mark as Incomplete" : "Mark as Complete";
    toggleBtn.onclick = () => toggleComplete(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.title = "Delete Task";
    deleteBtn.onclick = () => deleteTask(index);

    btnGroup.append(toggleBtn, deleteBtn);
    li.append(span, btnGroup);
    taskList.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const value = taskInput.value.trim();
  if (value) {
    tasks.push({ text: value, completed: false });
    taskInput.value = "";
    renderTasks();
  }
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function clearAllTasks() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks = [];
    renderTasks();
  }
}

function handleThemeToggle() {
  isDarkMode = !isDarkMode;
  applyTheme();
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});
clearAllBtn.addEventListener("click", clearAllTasks);
themeToggle.addEventListener("click", handleThemeToggle);

applyTheme();
renderTasks();
