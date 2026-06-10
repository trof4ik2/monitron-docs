document.addEventListener("DOMContentLoaded", function () {
  injectResetButton();
});

// При навигации MkDocs подгружает страницы без полной перезагрузки
document.addEventListener("DOMContentLoaded", function () {
  if (typeof document$ !== "undefined") {
    document$.subscribe(function () {
      injectResetButton();
    });
  }
});

function injectResetButton() {
  // Найти все чекбоксы на странице
  var checkboxes = document.querySelectorAll(".task-list-item input[type='checkbox']");
  if (checkboxes.length === 0) return;

  // Не добавлять кнопку повторно
  if (document.querySelector(".checklist-reset-btn")) return;

  // Создать кнопку
  var btn = document.createElement("button");
  btn.className = "checklist-reset-btn";
  btn.textContent = "Сбросить чеклист";
  btn.addEventListener("click", function () {
    var boxes = document.querySelectorAll(".task-list-item input[type='checkbox']");
    boxes.forEach(function (cb) {
      cb.checked = false;
      // Убрать визуальное зачёркивание с текста
      var label = cb.closest(".task-list-item");
      if (label) label.classList.remove("checked");
    });
  });

  // Вставить кнопку перед первым списком задач
  var firstList = document.querySelector(".task-list-item");
  if (firstList) {
    var parent = firstList.closest("ul");
    if (parent && parent.parentNode) {
      parent.parentNode.insertBefore(btn, parent);
    }
  }
}
