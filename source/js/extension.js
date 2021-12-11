"use strict";

initNavbarExtensions();

function initNavbarExtensions() {
  const fs = require("fs");
  const path = require("path");

  fs.readdir(path.join(`${__dirname}/extensions`), (error, files) => {
    if(error) {
      console.log(error);
    } else {
      files.forEach((file) => {
        var manifest = JSON.parse(fs.readFileSync(`${__dirname}/extensions/${file}/manifest.json`));
        var extensionButton = document.createElement("button");
        extensionButton.style.backgroundImage = `url("file://${__dirname}/extensions/${file}/${manifest.browser_action.default_icon[32]}")`;
        extensionButton.addEventListener("click", (event) => {
          openExtension(`file://${__dirname}/extensions/${file}/${manifest.browser_action.default_popup}`);
        });
        document.getElementById("navbar-extensions").appendChild(extensionButton);
      });
    }
  });
}

function openExtension(href, x = null, y = null) {
  var i = document.getElementById("context-menu");
  var j = document.getElementsByClassName("responsive")[0];
  var k = document.getElementById("webviews");

  var focusedTabView = document.querySelector(`webview.tab-webview[data-uuid="${selectedTab}"]`);

  j.addEventListener("pointerup", (event) => {
    if(i.classList.contains("shown")) {
      i.classList.remove("shown");
      k.classList.remove("disabled");
    }
  });
  k.addEventListener("pointerup", (event) => {
    if(i.classList.contains("shown")) {
      i.classList.remove("shown");
      k.classList.remove("disabled");
    }
  });

  i.innerHTML = "";
  i.style.left = null;
  i.style.top = null;
  i.style.left = `${x}px`;
  i.style.top = `${y}px`;
  i.style.width = null;
  i.style.height = null;
  
  setTimeout(() => {
    if(i.offsetLeft >= (window.innerWidth - i.getBoundingClientRect().width)) {
      i.style.left = `${x - i.getBoundingClientRect().width}px`;
    }
    if(i.offsetTop >= (window.innerHeight - i.getBoundingClientRect().height)) {
      i.style.top = `${y - i.getBoundingClientRect().height - 2}px`;
    }

    i.classList.add("shown");
    k.classList.add("disabled");
  }, 125);

  var frame = document.createElement("iframe");
  frame.src = href;
  frame.style.float = "left";
  frame.style.height = "460px";
  i.appendChild(frame);

  return i;
}
