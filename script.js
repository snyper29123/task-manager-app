let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let editIndex = -1; // tracker kung nag-eedit

displayTasks();

function addTask() {
  let input = document.getElementById("taskInput");
  let task = input.value;

  if (task === "") return;

  if (editIndex === -1) {
    // ADD MODE
    tasks.push(task);
  } else {
    // EDIT MODE
    tasks[editIndex] = task;
    editIndex = -1;

    document.querySelector("button").innerText = "Add";
  }

  input.value = "";

  saveTasks();
  displayTasks();
}

function displayTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    list.innerHTML += `
      <li>
        ${task}
        <div>
          <button onclick="startEdit(${index})">Edit</button>
          <button onclick="deleteTask(${index})">Delete</button>
        </div>
      </li>
    `;
  });
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  displayTasks();
}

function startEdit(index) {
  let input = document.getElementById("taskInput");

  input.value = tasks[index]; // ilagay sa input field
  editIndex = index;

  document.querySelector("button").innerText = "Update";
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}