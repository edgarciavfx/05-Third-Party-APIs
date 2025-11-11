$(document).ready(function () {
  // Handle task form submission
  $("#taskForm").on("submit", function (event) {
    event.preventDefault();

    const title = $("#taskTitle").val().trim();
    const description = $("#taskDescription").val().trim();
    const dueDate = $("#taskDueDate").val();

    if (!title || !description || !dueDate) return;

    const newTask = {
      id: Date.now(),
      title,
      description,
      dueDate,
      status: "todo",
    };

    $("#todo").append(createTaskCard(newTask));
    $("#taskForm")[0].reset(); // clear the form
    $("#taskModal").modal("hide"); // close the modal
    saveTasks();
  });

  function createTaskCard(task) {
    return `
    <div class="card mb-2" data-id="${task.id}">
      <div class="card-body">
        <h5 class="card-title">${task.title}</h5>
        <p class="card-text">${task.description}</p>
        <p class="text-muted small mb-1">Due: ${task.dueDate}</p>
        <button class="btn btn-sm btn-danger delete-task">Delete</button>
      </div>
    </div>
  `;
  }

  // Load tasks from localStorage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
      $(`#${task.status}`).append(createTaskCard(task));
    });
  }

  // Save tasks to localStorage
  function saveTasks() {
    const tasks = [];
    $(".card").each(function () {
      const id = $(this).data("id");
      const title = $(this).find(".card-title").text();
      const description = $(this).find(".card-text").text();
      const dueDate = $(this).find(".text-muted span").text();
      const status = $(this).closest(".task-column").attr("id");
      tasks.push({ id, title, description, dueDate, status });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  loadTasks();
});
