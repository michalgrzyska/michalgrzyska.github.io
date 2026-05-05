/* ─────────────────────────────────────────────────────────────
   picker.js — shared random-mission picker logic.

   Required globals (provided by the per-game script):
     _config.missions   — array of mission objects
     _config.filterFn   — function(missions, activeFilter) → array
     _config.renderCard — function(mission) → HTML string

   Global functions exposed for use in HTML:
     rollMission()
───────────────────────────────────────────────────────────── */

let _config = null;
let _activeFilter = "all";
let _currentMission = null;
let _rollCount = 0;

/* ── Card-building helpers (shared by per-game renderCard functions) ── */

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

function initPicker(config) {
  _config = config;

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      _activeFilter = btn.dataset.filter;
      _updateStats();
    });
  });

  _updateStats();
}

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
