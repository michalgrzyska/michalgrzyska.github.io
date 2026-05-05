// router.js — hash-based SPA navigation.
// Depends on: picker.js (loadGame), tropico4.js (T4_PICKER_CONFIG), tropico6.js (T6_PICKER_CONFIG)

const _viewHome = document.getElementById("view-home");
const _viewPicker = document.getElementById("view-picker");
const _pickerTitle = document.getElementById("picker-title");
const _pickerNotice = document.getElementById("picker-notice");

const _CONFIGS = {
  t4: T4_PICKER_CONFIG,
  t6: T6_PICKER_CONFIG,
};

function _showHome() {
  document.body.className = "view-home";
  _viewPicker.hidden = true;
  _viewHome.hidden = false;
}

function _showPicker(config) {
  document.body.className = `view-picker ${config.theme}`;
  _viewHome.hidden = true;
  _viewPicker.hidden = false;
  _pickerTitle.textContent = config.title;
  if (config.notice) {
    _pickerNotice.textContent = config.notice;
    _pickerNotice.hidden = false;
  } else {
    _pickerNotice.hidden = true;
  }
  loadGame(config);
}

function _navigate() {
  const key = location.hash.replace(/^#/, ""); // "t4", "t6", or ""
  const config = _CONFIGS[key];
  config ? _showPicker(config) : _showHome();
}

window.addEventListener("hashchange", _navigate);
_navigate();
