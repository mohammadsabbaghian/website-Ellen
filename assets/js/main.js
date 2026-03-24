/* 't Kalverveen — minimal JS: mobile menu toggle + FAQ keyboard support */
(function () {
  "use strict";

  /* Mobile menu */
  var toggle = document.getElementById("menu-toggle");
  var nav = document.getElementById("main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });
  }

  function setupLimitedCheckboxGroups() {
    var groups = document.querySelectorAll("[data-max-check]");
    groups.forEach(function (group) {
      var max = Number(group.getAttribute("data-max-check")) || 0;
      if (!max) return;

      var checkboxes = Array.prototype.slice.call(group.querySelectorAll("input[type='checkbox']"));
      var message = group.parentElement ? group.parentElement.querySelector("[data-max-message]") : null;

      function updateState() {
        var checked = checkboxes.filter(function (checkbox) { return checkbox.checked; });
        var isAtLimit = checked.length >= max;

        checkboxes.forEach(function (checkbox) {
          checkbox.disabled = isAtLimit && !checkbox.checked;
        });

        if (message) {
          message.hidden = !isAtLimit;
        }
      }

      checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
          var checkedCount = checkboxes.filter(function (item) { return item.checked; }).length;
          if (checkedCount > max) {
            checkbox.checked = false;
          }
          updateState();
        });
      });

      updateState();
    });
  }

  function setupSurveyProgress() {
    var forms = document.querySelectorAll("form[data-survey-progress]");

    function controlValue(control, form) {
      if (control.type === "radio") {
        return !!form.querySelector("input[name='" + control.name + "']:checked");
      }
      if (control.type === "checkbox") {
        return !!form.querySelector("input[name='" + control.name + "']:checked");
      }
      return String(control.value || "").trim().length > 0;
    }

    forms.forEach(function (form) {
      var formName = form.getAttribute("name");
      var progress = document.getElementById(formName === "interesse-kort" ? "progress-kort" : "progress-uitgebreid");
      var progressText = document.querySelector("[data-progress-text='" + formName + "']");
      if (!progress || !progressText) return;

      function updateProgress() {
        var requiredControls = Array.prototype.slice.call(form.querySelectorAll("[required]"));
        var seenNames = Object.create(null);
        var total = 0;
        var done = 0;

        requiredControls.forEach(function (control) {
          var key = control.name || control.id;
          if (!key || seenNames[key]) return;
          seenNames[key] = true;
          total += 1;
          if (controlValue(control, form)) {
            done += 1;
          }
        });

        var percentage = total > 0 ? Math.round((done / total) * 100) : 0;
        progress.value = percentage;
        progressText.textContent = String(percentage) + "%";
      }

      form.addEventListener("input", updateProgress);
      form.addEventListener("change", updateProgress);
      updateProgress();
    });
  }

  setupLimitedCheckboxGroups();
  setupSurveyProgress();

  window.addEventListener("stackbitObjectsChanged", function () {
    window.location.reload();
  });
})();
