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

    const card = $(createTaskCard(newTask));
    styleTaskCard(card, newTask.dueDate);
    $("#todo").append(card);
    saveTasks();

    $("#taskForm")[0].reset(); // clear the form
    $("#taskModal").modal("hide"); // close the modal
  });

  function styleTaskCard(card, dueDate) {
    const now = dayjs();
    const due = dayjs(dueDate);

    // reset background
    card.removeClass(function (index, className) {
      return (className.match(/(^|\s)bg-\S+/g) || []).join(" ");
    });

    if (due.isBefore(now, "day")) {
      card.addClass("bg-danger text-white");
    } else if (due.diff(now, "day") <= 2) {
      card.addClass("bg-warning");
    }
  }

  function createTaskCard(task) {
    return `
    <div class="card mb-2" data-id="${task.id}">
      <div class="card-body">
        <h5 class="card-title">${task.title}</h5>
        <p class="card-text">${task.description}</p>
        <p class="text-muted small mb-1">Due: <span>${dayjs(
          task.dueDate
        ).format("MMM D, YYYY")}</span></p>
        <button class="btn btn-sm btn-danger delete-task">Delete</button>
      </div>
    </div>
  `;
  }

  // Load tasks from localStorage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
      const card = $(createTaskCard(task));
      styleTaskCard(card, task.dueDate);
      $(`#${task.status}`).append(card);
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
  saveTasks();
});
