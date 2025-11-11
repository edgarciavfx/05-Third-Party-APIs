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
});
