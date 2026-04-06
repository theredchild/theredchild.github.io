/* Theme toggle — follows steipete.me pattern */
(function () {
  var saved = localStorage.getItem("theme");
  var ts = localStorage.getItem("themeSetTs");
  var manual = false;

  if (ts && (Date.now() - parseInt(ts)) / 36e5 < 24) {
    manual = true;
  } else {
    localStorage.removeItem("theme");
    localStorage.removeItem("themeSetTs");
    saved = null;
  }

  function sys() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  var theme = manual && saved ? saved : sys();

  function apply() {
    document.documentElement.setAttribute("data-theme", theme);
    var btn = document.querySelector("#theme-btn");
    if (btn) btn.setAttribute("aria-label", theme);
  }

  apply();

  window.addEventListener("DOMContentLoaded", function () {
    apply();
    var btn = document.querySelector("#theme-btn");
    if (btn) {
      btn.addEventListener("click", function () {
        theme = theme === "light" ? "dark" : "light";
        localStorage.setItem("theme", theme);
        localStorage.setItem("themeSetTs", Date.now().toString());
        manual = true;
        apply();
      });
    }
  });

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function (e) {
      if (!manual) {
        theme = e.matches ? "dark" : "light";
        apply();
      }
    });
})();
