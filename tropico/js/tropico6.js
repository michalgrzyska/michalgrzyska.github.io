// tropico6.js — T6-specific rendering and filter logic.
// Depends on: picker.js (initPicker, rollMission), missions-t6.js (MISSIONS_T6)

const _T6_ERA_BADGE = {
  Colonial: "badge-colonial",
  "World Wars": "badge-world-wars",
  "Cold War": "badge-cold-war",
  Modern: "badge-modern",
};

const _T6_ERA_ICON = {
  Colonial: "⚓",
  "World Wars": "⚔️",
  "Cold War": "☢️",
  Modern: "📡",
};

function _t6RenderCard(pick) {
  const dlcNote = pick.dlc
    ? `<span class="island-tag" style="margin-left:auto">DLC: <span>${pick.dlc}</span></span>`
    : `<span class="island-tag">Base Game</span>`;

  const eraBadgeClass = _T6_ERA_BADGE[pick.era] || "badge-modern";
  const eraIcon = _T6_ERA_ICON[pick.era] || "🌴";
  const primaryBadge = pick.type === "DLC" ? "badge-dlc" : eraBadgeClass;

  return `
    <div class="card-inner" id="card-inner">
      <div class="mission-number">Mission #${pick.id}</div>
      <div class="mission-name">${pick.name}</div>
      <div class="mission-meta">
        <span class="badge ${primaryBadge}">
          ${pick.type === "DLC" ? "🎁" : eraIcon} ${pick.era}
        </span>
        <span class="badge ${eraBadgeClass}" style="opacity:0.6;font-size:0.65rem">
          ${pick.type}
        </span>
        ${dlcNote}
      </div>
      <div class="mission-desc">${pick.desc}</div>
    </div>
  `;
}

function _t6FilterFn(missions, filter) {
  if (filter === "all") return missions;
  if (filter === "DLC") return missions.filter((m) => m.type === "DLC");
  return missions.filter((m) => m.era === filter);
}

initPicker({
  missions: MISSIONS_T6,
  filterFn: _t6FilterFn,
  renderCard: _t6RenderCard,
});
