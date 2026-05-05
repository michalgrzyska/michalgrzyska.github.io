// tropico4.js — T4-specific rendering, filter logic, and picker config.
// Depends on: picker.js (_makeBadge, _makeTag, _buildCard), missions-t4.js (MISSIONS_T4)

// Precompute each mission's position within its category, e.g. "3 / 20"
const _T4_CAT_POSITION = (() => {
  const totals = {};
  const counters = {};
  for (const m of MISSIONS_T4)
    totals[m.category] = (totals[m.category] || 0) + 1;
  const map = new Map();
  for (const m of MISSIONS_T4) {
    counters[m.category] = (counters[m.category] || 0) + 1;
    map.set(m.id, `${counters[m.category]} / ${totals[m.category]}`);
  }
  return map;
})();

const _T4_CAT_CLASS = {
  Campaign: "badge-campaign",
  "Modern Times": "badge-modern-times",
  DLC: "badge-dlc",
};

const _T4_CAT_ICON = {
  Campaign: "⭐",
  "Modern Times": "🔭",
  DLC: "🎁",
};

function _t4RenderCard(pick) {
  const catPos = _T4_CAT_POSITION.get(pick.id);
  const islandTag = pick.island ? _makeTag("Island", pick.island) : "";
  const dlcNote = pick.dlcPack
    ? _makeTag("Requires", `${pick.dlcPack} DLC`, true)
    : "";
  const meta =
    _makeBadge(
      _T4_CAT_CLASS[pick.category] ?? "badge-dlc",
      _T4_CAT_ICON[pick.category] ?? "🎁",
      pick.category,
    ) +
    islandTag +
    dlcNote;

  return _buildCard({
    label: `${pick.category} — mission ${catPos}`,
    name: pick.name,
    meta,
    desc: pick.desc,
  });
}

function _t4FilterFn(missions, filter) {
  return filter === "all"
    ? missions
    : missions.filter((m) => m.category === filter);
}

// Config consumed by router.js → loadGame()
const T4_PICKER_CONFIG = {
  missions: MISSIONS_T4,
  filterFn: _t4FilterFn,
  renderCard: _t4RenderCard,
  filters: [
    { value: "all", label: "All Missions" },
    { value: "Campaign", label: "Campaign" },
    { value: "Modern Times", label: "Modern Times" },
    { value: "DLC", label: "DLC" },
  ],
  emptyIcon: "🌴",
  notice: null,
  theme: "theme-t4",
  title: "Tropico 4",
};
