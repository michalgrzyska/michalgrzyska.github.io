// tropico4.js — T4-specific rendering and filter logic.
// Depends on: picker.js (initPicker, rollMission), missions-t4.js (MISSIONS_T4)

// Precompute each mission's position within its category, e.g. "3 / 20"
const _T4_CAT_POSITION = (() => {
  const counters = {};
  const totals = {};
  for (const m of MISSIONS_T4) {
    totals[m.category] = (totals[m.category] || 0) + 1;
  }
  const map = new Map();
  for (const m of MISSIONS_T4) {
    counters[m.category] = (counters[m.category] || 0) + 1;
    map.set(m.id, `${counters[m.category]} / ${totals[m.category]}`);
  }
  return map;
})();

function _t4CategoryClass(cat) {
  if (cat === "Campaign") return "badge-campaign";
  if (cat === "Modern Times") return "badge-modern-times";
  return "badge-dlc";
}

function _t4CategoryIcon(cat) {
  if (cat === "Campaign") return "⭐";
  if (cat === "Modern Times") return "🔭";
  return "🎁";
}

function _t4RenderCard(pick) {
  const dlcNote = pick.dlcPack
    ? `<span class="island-tag" style="margin-left:auto">Requires: <span>${pick.dlcPack} DLC</span></span>`
    : "";

  const catPos = _T4_CAT_POSITION.get(pick.id);

  return `
    <div class="card-inner" id="card-inner">
      <div class="mission-number">${pick.category} — mission ${catPos}</div>
      <div class="mission-name">${pick.name}</div>
      <div class="mission-meta">
        <span class="badge ${_t4CategoryClass(pick.category)}">${_t4CategoryIcon(pick.category)} ${pick.category}</span>
        ${pick.island ? `<span class="island-tag">Island: <span>${pick.island}</span></span>` : ""}
        ${dlcNote}
      </div>
      <div class="mission-desc">${pick.desc}</div>
    </div>
  `;
}

function _t4FilterFn(missions, filter) {
  if (filter === "all") return missions;
  return missions.filter((m) => m.category === filter);
}

initPicker({
  missions: MISSIONS_T4,
  filterFn: _t4FilterFn,
  renderCard: _t4RenderCard,
});
