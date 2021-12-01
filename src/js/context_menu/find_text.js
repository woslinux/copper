"use strict";
document.getElementById("find-text").addEventListener("click", (event) => {
  var i = document.getElementById("context-menu");
  var j = document.getElementById("tab-views");

  j.addEventListener("pointerup", (event) => {
    if(i.classList.contains("shown")) {
      document.querySelector(`webview.tab-webview[data-uuid="${selectedTab}"]`).stopFindInPage("clearSelection");
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

  var k = document.createElement("header");
  k.setAttribute("data-l10n-id", "tab-find");
  i.appendChild(k);

  var l = document.createElement("input");
  l.type = "text";
  l.style.width = "100%";
  l.style.setProperty("box-sizing", "border-box");
  l.addEventListener("keydown", (event) => {
    setTimeout(() => {
      if(l.value !== "") {
        i1.findInPage(event.target.value);
        if(event.keyCode == 13) {
          i1.findInPage(event.target.value);
        }
      } else {
        i1.stopFindInPage("clearSelection");
      }
    }, 1);
  });
  i.appendChild(l);

  var i1 = document.createElement("button");
  i1.style.textAlign = "center";
  i1.setAttribute("data-l10n-id", "cancel");
  i1.addEventListener("click", (event) => {
    i1.stopFindInPage("clearSelection");
    i.classList.remove("shown");
    j.classList.remove("disabled");
  });
  i.appendChild(i1);

  var i1 = document.querySelector(`webview.tab-webview[data-uuid="${selectedTab}"]`);

  setTimeout(() => {
    l.focus();
  }, 250);

  i.style.height = "123px";
});
