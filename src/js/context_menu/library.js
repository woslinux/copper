"use strict";
document.getElementById("library").addEventListener("click", (event) => {
  const fs = require("fs");
  const { shell } = require("electron");

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
  i.style.left = null;
  i.style.right = null;
  i.style.top = null;
  i.style.width = null;

  var children = [
    document.createElement("header"),
    document.createElement("button"),
    document.createElement("hr"),
    document.createElement("div")
  ];

  children[0].setAttribute("data-l10n-id", "library");

  children[1].setAttribute("data-l10n-id", "library-clear");
  children[1].setAttribute("data-keybind", "Ctrl+D");
  children[1].addEventListener("click", (event) => {
    bookmarkList = [];
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
      children[3].innerHTML = "";
  });

  children[3].style.height = "376px";
  children.forEach((element) => {
    i.appendChild(element);
  });

  bookmarkList.forEach((bookmark, index) => {
    var k = document.createElement("button");
    k.style.float = "left";
    k.style.padding = "0 8px";
    k.addEventListener("click", (event) => {
      Browser.newTab(bookmark.url, false);
    });

    var l = document.createElement("img");
    l.src = `http://www.google.com/s2/favicons?domain=${bookmark.url}`;
    l.style.float = "var(--float-dir-start)";
    l.style.margin = "7px";
    l.style.width = "21px";
    k.appendChild(l);

    var i1 = document.createElement("p");
    i1.style.float = "var(--float-dir-start)";
    i1.style.margin = "7px 8px";
    i1.style.overflow = "hidden";
    i1.style.textOverflow = "ellipsis";
    i1.style.whiteSpace = "nowrap";
    i1.style.width = "calc(100% - 91px)";
    i1.innerText = bookmark.title;
    k.appendChild(i1);

    var j1 = document.createElement("button");
    j1.style.backgroundImage = "url(\"images/trash.png\")";
    j1.style.backgroundPosition = "center";
    j1.style.backgroundRepeat = "no-repeat";
    j1.style.backgroundSize = "24px";
    j1.style.float = "var(--float-dir-start)";
    j1.style.width = "40px";
    j1.addEventListener("pointerup", (event) => {
      event.preventDefault();
      bookmarkList.splice(index, 1);
      k.remove();
      localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
    });
    k.appendChild(j1);

    children[3].appendChild(k);
  });

  i.style.height = "480px";
});
