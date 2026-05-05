// tropico6.js — T6-specific rendering and filter logic.
// Depends on: picker.js (_makeBadge, _makeTag, _buildCard, initPicker), missions-t6.js (MISSIONS_T6)

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
  const isDLC = pick.type === "DLC";
  const eraCls = _T6_ERA_BADGE[pick.era] ?? "badge-modern";
  const eraIcon = _T6_ERA_ICON[pick.era] ?? "🌴";
  const dlcNote = isDLC
    ? _makeTag("DLC", pick.dlc, true)
    : `<span class="island-tag">Base Game</span>`;
  const meta =
    _makeBadge(isDLC ? "badge-dlc" : eraCls, isDLC ? "🎁" : eraIcon, pick.era) +
    `<span class="badge ${eraCls}" style="opacity:0.6;font-size:0.65rem">${pick.type}</span>` +
    dlcNote;

  return _buildCard({
    label: `Mission #${pick.id}`,
    name: pick.name,
    meta,
    desc: pick.desc,
  });
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
