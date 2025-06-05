const tasks = [
  { text: "Learn semantic HTML", completed: false },
  { text: "Master Flexbox and Grid", completed: false },
];

const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const taskSpan = document.createElement("span");
    taskSpan.textContent = task.completed ? `${task.text} (Completed)` : task.text;

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

    btnGroup.appendChild(toggleBtn);
    btnGroup.appendChild(deleteBtn);

    li.appendChild(taskSpan);
    li.appendChild(btnGroup);
    taskList.appendChild(li);
  });
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

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

renderTasks();
