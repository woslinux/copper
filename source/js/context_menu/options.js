"use strict";
document.getElementById("navbar-options").addEventListener("click", (event) => {
  const { ipcRenderer } = require("electron");
  var i = openContextMenu([
    {
      type: "button",
      label: "newTab",
      onclick: () => {
        Browser.open();
      }
    },
    {
      type: "button",
      label: "newPrivateTab",
      onclick: () => {
        Browser.open(homeURL, true, true);
      }
    },
    {
      type: "button",
      label: "newWindow",
      onclick: () => {
        ipcRenderer.invoke("new-window");
      }
    },
    {
      type: "hr"
    },
    {
      type: "button",
      label: "library",
      onclick: () => {}
    },
    {
      type: "button",
      label: "addons",
      onclick: () => {}
    },
    {
      type: "button",
      label: "settings",
      onclick: () => {}
    },
    {
      type: "hr"
    },
    {
      type: "button",
      label: "exit",
      onclick: () => {}
    }
  ]);
});
