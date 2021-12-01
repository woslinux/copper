"use strict";
document.getElementById("favorite").addEventListener("click", (event) => {
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
    document.createElement("p"),
    document.createElement("input"),
    document.createElement("p"),
    document.createElement("input"),
    document.createElement("hr"),
    document.createElement("button"),
    document.createElement("button")
  ];

  children[0].setAttribute("data-l10n-id", "addBookmark");

  children[1].setAttribute("data-l10n-id", "addBookmark-name");

  children[2].type = "text";
  children[2].value = document.querySelector(`webview.tab-webview[data-uuid="${selectedTab}"]`).getTitle();
  children[2].style.width = "100%";
  children[2].style.setProperty("box-sizing", "border-box");

  children[3].setAttribute("data-l10n-id", "addBookmark-url");

  children[4].type = "text";
  children[4].value = document.querySelector(`webview.tab-webview[data-uuid="${selectedTab}"]`).getURL();
  children[4].style.width = "100%";
  children[4].style.setProperty("box-sizing", "border-box");

  children[6].setAttribute("data-l10n-id", "cancel");
  children[6].style.textAlign = "center";
  children[6].style.width = "50%";
  children[6].addEventListener("click", (event) => {
    i.classList.remove("shown");
    j.classList.remove("disabled");
  });

  children[7].setAttribute("data-l10n-id", "add");
  children[7].style.textAlign = "center";
  children[7].style.width = "50%";
  children[7].addEventListener("click", (event) => {
    if(children[2].value !== "" && children[4].value !== "") {
      bookmarkList.push({
        title: children[2].value,
        url: children[4].value
      });
      localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
      i.classList.remove("shown");
      j.classList.remove("disabled");
      var libraryBtn = document.getElementById("library");
      libraryBtn.classList.add("notify");
      setTimeout(() => {
        libraryBtn.classList.remove("notify");
      }, 1000);
    }
  });

  children.forEach((element) => {
    i.appendChild(element);
  });

  i.style.height = "251px";
});
