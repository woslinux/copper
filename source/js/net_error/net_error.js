"use strict";
document.getElementById("reload").addEventListener("click", (event) => {
  window.top.document.querySelector(`webview.tab-webview[data-uuid="${window.top.selectedTab}"]`).reload();
});
