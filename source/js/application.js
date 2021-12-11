"use strict";
// const { remote } = require("electron");
// var win = remote.BrowserWindow.getFocusedWindow();
// window.addEventListener("resize", (event) => {
//   if(win.isMaximized()) {
//     document.getElementById("main-window").classList.add("maximized");
//   } else {
//     document.getElementById("main-window").classList.remove("maximized");
//   }
//   if(win.isFullScreen()) {
//     document.getElementById("main-window").classList.add("fullscreen");
//   } else {
//     document.getElementById("main-window").classList.remove("fullscreen");
//   }
// });
var isMobile = navigator.userAgent.match(/Android|iPhone/i);
var languages = [
  "ar-SA",
  "en-US"
]
var fontSize = 16;
var historyList = [];
var bookmarkList = [];
var counter = 0;
var selectedTab = window.location.hash.substring(1).split("=")[1];
const homeURL = "about:blank#home";

window.addEventListener("load", (event) => {
  const { ipcRenderer, systemPreferences } = require("electron");
  if(localStorage.getItem("fontSize") !== null) {
    fontSize = JSON.parse(localStorage.getItem("fontSize"));
  }
  if(localStorage.getItem("historyList") !== null) {
    historyList = JSON.parse(localStorage.getItem("historyList"));
  }
  if(localStorage.getItem("bookmarkList") !== null) {
    bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
  }
  Browser.open();
  var newTabButton = document.getElementById("tabsToolbar-newTab");
  var sideTabsButton = document.getElementById("tabsToolbar-sideTabs");
  newTabButton.addEventListener("pointerup", (event) => {
    Browser.open();
  });
  sideTabsButton.addEventListener("pointerup", (event) => {
    document.getElementById("main-window").classList.toggle("sidetabs");
    if(localStorage.getItem("sidetabs") == "true") {
      localStorage.setItem("sidetabs", false);
    } else {
      localStorage.setItem("sidetabs", true);
    }
  });
  document.addEventListener("keydown", (event) => {
    if(event.keyCode == 17 && event.keyCode == 9) {
      var i = document.querySelectorAll(`button.tab[data-uuid]`);
      if(counter < i.length - 1) {
        Browser.focus(i[counter].nextElementSibling.getAttribute("data-uuid"));
        counter += 1;
      } else {
        Browser.focus(i[0].getAttribute("data-uuid"));
        counter = 0;
      }
    }
  });
  if(localStorage.getItem("sidetabs") == "true") {
    document.getElementById("main-window").classList.add("sidetabs");
  }
  document.getElementById("navbar-urlbar").addEventListener("focus", (event) => {
    event.target.select();
  });
  if(process.platform == "win32") {
    console.log(systemPreferences.getAccentColor());
    document.getElementById("main-window").style.backgroundColor = `#${systemPreferences.getAccentColor()}`;
    systemPreferences.addEventListener("accent-color-changed", (event) => {
      document.getElementById("main-window").style.backgroundColor = `#${event.newColor}`;
    });
  } else if(process.platform == "darwin") {
    document.getElementById("main-window").classList.add("darwin");
  } else if(process.platform == "linux") {
    document.getElementById("main-window").classList.add("linux");
  }
});
