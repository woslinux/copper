"use strict";
document.getElementById("options").addEventListener("click", (event) => {
  var i = document.getElementById("context-menu");
  var j = document.getElementById("tab-views");

  // This Makes Menu Hide on Clicking The WebView.
  j.addEventListener("pointerup", (event) => {
    if(i.classList.contains("shown")) {
      i.classList.remove("shown");
      j.classList.remove("disabled");
    }
  });
  i.classList.add("shown");
  j.classList.add("disabled");

  // This Fixes The Bug That Causes Menu To Stay The Same Size.
  i.innerHTML = "";
  i.style.left = null;
  i.style.right = null;
  i.style.top = null;
  i.style.width = null;

  // List of Created/Registered Elements.
  var children = [
    document.createElement("button"),
    document.createElement("hr"),
    document.createElement("button"),
    document.createElement("button"),
    document.createElement("hr"),
    document.createElement("button"),
    document.createElement("button"),
    document.createElement("button"),
    document.createElement("hr"),
    document.createElement("button")
  ];

  // L20n Names for Menu Elements.
  children[0].setAttribute("data-l10n-id", "newTab");
  children[0].setAttribute("data-keybind", "Ctrl+T");
  children[2].setAttribute("data-l10n-id", "library");
  children[2].setAttribute("data-keybind", "Ctrl+B");
  children[3].setAttribute("data-l10n-id", "history");
  children[3].setAttribute("data-keybind", "Ctrl+H");
  children[5].setAttribute("data-l10n-id", "downloads");
  children[5].setAttribute("data-keybind", "Ctrl+D");
  children[6].setAttribute("data-l10n-id", "addons");
  children[6].setAttribute("data-keybind", "Ctrl+A");
  children[7].setAttribute("data-l10n-id", "settings");
  children[7].setAttribute("data-keybind", "Ctrl+I");
  children[9].setAttribute("data-l10n-id", "exit");
  children[9].setAttribute("data-keybind", "Alt+F4");

  // Event Listeners for Buttons.
  children[0].addEventListener("click", (event) => {
    Browser.newTab();
  });

  children[2].addEventListener("click", (event) => {
    document.getElementById("library").click();
  });

  children[3].addEventListener("click", (event) => {
    openHistory(i);
  });

  children[5].addEventListener("click", (event) => {
    document.getElementById("downloads").click();
  });

  children[6].addEventListener("click", (event) => {
    document.getElementById("addons").click();
  });

  children[7].addEventListener("click", (event) => {
    openSettings(i);
  });
  children[9].addEventListener("click", (event) => {
    var exitMessage = "Are you sure you want to exit now?";
    if(navigator.language == "ar") {
      exitMessage = "هل أنت متأكد أنك تريد الخروج الآن؟";
    } else if(navigator.language == "de-DE") {
      exitMessage = "Möchten Sie jetzt wirklich beenden?";
    } else if(navigator.language == "en") {
      exitMessage = "Are you sure you want to exit now?";
    } else if(navigator.language == "pr-BR") {
      exitMessage = "Tem certeza de que deseja sair agora?";
    } else if(navigator.language == "es-ES") {
      exitMessage = "Are you sure you want to exit now?";
    } else if(navigator.language == "kr-KR") {
      exitMessage = "지금 종료하시겠습니까?";
    } else if(navigator.language == "it-IT") {
      exitMessage = "Sei sicuro di voler uscire ora?";
    }

    var i = confirm(exitMessage);
    if(i) {
      window.close();
    }
  });

  children.forEach((element) => {
    i.appendChild(element);
  });

  i.style.height = "322px";
});
