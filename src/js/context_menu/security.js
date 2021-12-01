"use strict";
document.getElementById("security").addEventListener("click", (event) => {
  var i = document.getElementById("context-menu");
  var j = document.getElementById("tab-views");

  j.addEventListener("pointerup", (event) => {
    if(i.classList.contains("shown")) {
      i.classList.remove("shown");
      j.classList.remove("disabled");
    }
  });
  i.classList.add("shown");
  j.classList.add("disabled");

  i.innerHTML = "";

  var boxOffsetX = 180;
  if(document.dir == "rtl") {
    i.style.left = `calc(100% - ${boxOffsetX + 320}px)`;
  } else {
    i.style.left = `${boxOffsetX}px`;
  }
  i.style.right = null;
  i.style.top = null;
  i.style.width = null;
  i.style.height = null;

  var children = [
    document.createElement("header"),
    document.createElement("p"),
    document.createElement("hr"),
    document.createElement("button")
  ];

  children[0].setAttribute("data-l10n-id", "security");

  if(event.target.classList.contains("file")) {
    children[1].style.color = "#c0a000";
    children[1].setAttribute("data-l10n-id", "security-file");
  } else if(event.target.classList.contains("https")) {
    children[1].style.color = "#40c040";
    children[1].setAttribute("data-l10n-id", "security-secure");
  } else {
    children[1].style.color = "#c04040";
    children[1].setAttribute("data-l10n-id", "security-unsecure");
  }

  children[3].setAttribute("data-l10n-id", "history-remove");

  children.forEach((element) => {
    i.appendChild(element);
  });
});
