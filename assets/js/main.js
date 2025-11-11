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

    console.log(newTask);
  });
});
