// ---------- Helper Functions ----------
function getDueClass(dueDate) {
  const now = dayjs();
  const due = dayjs(dueDate);
  if (due.isBefore(now, "day")) return "bg-danger text-white";
  if (due.isSame(now, "day")) return "bg-warning text-dark";
  if (due.diff(now, "day") <= 2) return "bg-info text-dark";
  return "bg-secondary text-white";
}

function renderTask(task) {
  const card = $("<div>").addClass("card mb-3").attr("data-id", task.id);
  const body = $("<div>").addClass("card-body text-start");

  const title = $("<h5>").addClass("card-title").text(task.title);
  const desc = $("<p>").addClass("card-text").text(task.desc);
  const badge = $("<span>")
    .addClass(`badge mb-2 d-inline-block ${getDueClass(task.dueDate)}`)
    .text(dayjs(task.dueDate).format("MMM D, YYYY"));
  const delBtn = $("<button>")
    .addClass("btn btn-sm btn-outline-danger mt-2 delete-task")
    .attr("aria-label", "Delete task")
    .text("Delete");

  body.append(title, badge, desc, delBtn);
  card.append(body);

  $(`#${task.status}`).append(card);
}

// ---------- Main Logic ----------
$(document).ready(function () {
  const tasks = JSON.parse(localStorage.getItem("backlog")) || [];

  $(document).on("click", ".delete-task", function () {
    const card = $(this).closest(".card");
    const taskId = card.data("id");
    card.remove();
    const tasks = JSON.parse(localStorage.getItem("backlog")) || [];
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    localStorage.setItem("backlog", JSON.stringify(updatedTasks));
  });

  $(".task-list").sortable({
    connectWith: ".task-list",
    placeholder: "sortable-placeholder",
    forcePlaceholderSize: true,
    update: function (event, ui) {
      if (!ui.item.parent().is(this)) return;
      const card = ui.item;
      const taskId = card.data("id");
      const newStatus = $(this).attr("id");
      const tasks = JSON.parse(localStorage.getItem("backlog")) || [];
      const updated = tasks.map((t) =>
        t.id === taskId ? { ...t, status: newStatus } : t
      );
      localStorage.setItem("backlog", JSON.stringify(updated));
    },
  });

  $("#save-task").on("click", function () {
    const title = $("#task-title").val().trim();
    const desc = $("#task-desc").val().trim();
    const dueDate = $("#task-date").val();
    if (!title || !dueDate) {
      alert("Please fill out both title and due date!");
      return;
    }
    const newTask = {
      id: crypto.randomUUID(),
      title,
      desc,
      dueDate,
      status: "to-do",
    };
    tasks.push(newTask);
    localStorage.setItem("backlog", JSON.stringify(tasks));
    renderTask(newTask);
    $("#newTaskForm")[0].reset();
    const modal = bootstrap.Modal.getInstance($("#newTaskModal")[0]);
    modal.hide();
    $(`#${newTask.status} .card`).last().hide().fadeIn(300);
  });

  tasks.forEach(renderTask);
});
