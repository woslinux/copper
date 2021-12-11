"use strict";
document.getElementById("navbar-downloads").addEventListener("click", (event) => {
  const fs = require("fs");
  const { shell } = require("electron");
  var i = document.getElementById("context-menu");
  var j = document.getElementById("webviews");

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
  i.style.height = null;

  // List of Created/Registered Elements.
  var children = [
    document.createElement("header"),
    document.createElement("button"),
    document.createElement("hr"),
    document.createElement("div")
  ];

  children[0].setAttribute("data-l10n-id", "downloads");

  // This is a Button That Takes You To Your Downloads Folder.
  children[1].setAttribute("data-l10n-id", "downloads-folder");
  children[1].setAttribute("data-keybind", "Ctr+Shift+D");
  var downloadsPath = "";
  if(process.platform == "win32") {
    downloadsPath = `C:\\Users\\${process.env.USERNAME}\\Downloads`;
  } else if(process.platform == "darwin" || process.platform == "wos") {
    downloadsPath = `/Users/${process.env.USER}/Downloads`;
  } else {
    downloadsPath = `/home/${process.env.USER}/Downloads`;
  }
  children[1].addEventListener("click", (event) => {
    shell.openPath(downloadsPath);
  });

  children[3].style.height = "374px";

  // This Lists Your Downloads Folder Files.
  fs.readdir(downloadsPath, (error, files) => {
    if(error) {
      return console.log("Unable to scan directory: " + error);
    } 
    files.forEach((file) => {
      var k = document.createElement("button");
      k.innerText = file;
      k.addEventListener("click", (event) => {
         shell.openPath(`${downloadsPath}/${file}`);
      });
      children[3].appendChild(k);
    });
  });

  children.forEach((element) => {
    i.appendChild(element);
  });
});
