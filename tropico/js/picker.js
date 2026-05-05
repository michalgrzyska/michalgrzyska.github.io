/* ─────────────────────────────────────────────────────────────
   picker.js — shared random-mission picker logic.

   Globals exposed for router.js:
     loadGame(config)  — configure picker for a game
   Globals exposed for per-game files:
     _makeBadge / _makeTag / _buildCard — card HTML helpers
───────────────────────────────────────────────────────────── */

let _config = null;
let _activeFilter = "all";
let _currentMission = null;
let _rollCount = 0;

/* ── Card-building helpers ── */

function _makeBadge(cls, icon, text) {
  return `<span class="badge ${cls}">${icon} ${text}</span>`;
}

function _makeTag(label, value, right = false) {
  const style = right ? ' style="margin-left:auto"' : "";
  return `<span class="island-tag"${style}>${label}: <span>${value}</span></span>`;
}

function _buildCard({ label, name, meta, desc }) {
  return `
    <div class="card-inner" id="card-inner">
      <div class="mission-number">${label}</div>
      <div class="mission-name">${name}</div>
      <div class="mission-meta">${meta}</div>
      <div class="mission-desc">${desc}</div>
    </div>
  `;
}

/* ── Game loader — called by router on each game navigation ── */

function loadGame(config) {
  _config = config;
  _activeFilter = "all";
  _currentMission = null;
  _rollCount = 0;

  // Build filter buttons dynamically
  const filtersEl = document.getElementById("picker-filters");
  filtersEl.innerHTML = config.filters
    .map(
      (f) =>
        `<button class="filter-btn${f.value === "all" ? " active" : ""}" data-filter="${f.value}">${f.label}</button>`,
    )
    .join("");

  // Use onclick to replace any previous listener without stacking
  filtersEl.onclick = (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    filtersEl
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    _activeFilter = btn.dataset.filter;
    _updateStats();
  };

  // Reset card to empty state
  document.getElementById("card").innerHTML = `
    <div class="card-empty">
      <div class="icon">${config.emptyIcon}</div>
      <div>Press the button, El Presidente</div>
    </div>
  `;

  _updateStats();
}

/* ── Core picker logic ── */

function _getPool() {
  return _config.filterFn(_config.missions, _activeFilter);
}

function rollMission() {
  const pool = _getPool();
  if (!pool.length) return;

  let pick;
  if (pool.length === 1) {
    pick = pool[0];
  } else {
    let tries = 0;
    do {
      pick = pool[Math.floor(Math.random() * pool.length)];
      tries++;
    } while (pick === _currentMission && tries < 10);
  }

  _currentMission = pick;
  _rollCount++;

  const card = document.getElementById("card");
  const inner = card.querySelector(".card-inner");
  if (inner) inner.classList.remove("visible");

  setTimeout(
    () => {
      card.innerHTML = _config.renderCard(pick);
      requestAnimationFrame(() => {
        document.getElementById("card-inner").classList.add("visible");
      });
    },
    inner ? 150 : 0,
  );

  _updateStats();
}

function _updateStats() {
  const pool = _getPool();
  const count = pool.length;
  const statsEl = document.getElementById("stats");
  statsEl.textContent =
    _rollCount > 0
      ? `${count} mission${count !== 1 ? "s" : ""} in pool · ${_rollCount} roll${_rollCount !== 1 ? "s" : ""} so far`
      : `${count} mission${count !== 1 ? "s" : ""} available`;
}

// Wire roll button once (element is permanent in the SPA DOM)
document.getElementById("btn-roll").addEventListener("click", rollMission);
