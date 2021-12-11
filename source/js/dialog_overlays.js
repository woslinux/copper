"use strict";

function alert(title) {
  const { exec } = require("child_process");

  var i = document.getElementById("dialog-alert");
  i.classList.add("shown");

  document.getElementById("dialog-alert-text").innerText = title;

  document.getElementById("dialog-alert-ok").addEventListener("click", (event) => {
    i.classList.remove("shown");
  });

  exec("gsettings get org.gnome.desktop.sound theme-name", (error, stdout, stderr) => {
    if(error) {
      console.log(error);
    }
    if(stderr) {
      console.log(stderr);
    }
    new Audio(`/usr/share/sounds/${stdout.replace("'", "").replace("'", "")}/stereo/message.oga`).play();
  });
}

function confirm(title, detail = "", onconfirm) {
  const { exec } = require("child_process");

  var i = document.getElementById("dialog-confirm");
  i.classList.add("shown");

  document.getElementById("dialog-confirm-title").setAttribute("data-l10n-id", title);
  document.getElementById("dialog-confirm-detail").setAttribute("data-l10n-id", detail);

  document.getElementById("dialog-confirm-cancel").addEventListener("click", (event) => {
    i.classList.remove("shown");
  });
  document.getElementById("dialog-confirm-ok").addEventListener("click", (event) => {
    i.classList.remove("shown");
    onconfirm();
  });

  exec("gsettings get org.gnome.desktop.sound theme-name", (error, stdout, stderr) => {
    if(error) {
      console.log(error);
    }
    if(stderr) {
      console.log(stderr);
    }
    new Audio(`/usr/share/sounds/${stdout.replace("'", "").replace("'", "")}/stereo/dialog-question.oga`).play();
  });
}
