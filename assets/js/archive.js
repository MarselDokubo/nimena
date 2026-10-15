(function () {
  "use strict";

  const buttons = Array.from(document.querySelectorAll("[data-archive-filter]"));
  const cards = Array.from(document.querySelectorAll("[data-archive-card]"));
  const count = document.getElementById("nimena-archive-count");
  const empty = document.getElementById("nimena-archive-empty");
  const jumps = Array.from(document.querySelectorAll("[data-archive-jump]"));

  if (!buttons.length || !cards.length) return;

  function applyFilter(filter) {
    let visible = 0;

    cards.forEach((card) => {
      const matches = filter === "all"
        || card.dataset.kind === filter
        || card.dataset.year === filter;
      card.hidden = !matches;
      if (matches) visible += 1;
    });

    buttons.forEach((button) => {
      const active = button.dataset.archiveFilter === filter;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    if (count) count.textContent = `${visible} archive item${visible === 1 ? "" : "s"}`;
    if (empty) empty.hidden = visible !== 0;
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => applyFilter(button.dataset.archiveFilter || "all"));
  });

  jumps.forEach((jump) => {
    jump.addEventListener("click", () => {
      window.setTimeout(() => applyFilter(jump.dataset.archiveJump || "all"), 50);
    });
  });

  applyFilter("all");
})();
