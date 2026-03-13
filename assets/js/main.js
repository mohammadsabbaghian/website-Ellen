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

  window.addEventListener("stackbitObjectsChanged", function () {
    window.location.reload();
  });
})();
