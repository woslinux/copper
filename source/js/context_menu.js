"use strict";

function openContextMenu(items = [], x = null, y = null) {
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

  items.forEach((item) => {
    if(item.type == "button") {
      var button = document.createElement("button");
      button.setAttribute("data-l10n-id", item.label);
      button.addEventListener("click", item.onclick);
      i.appendChild(button);

      if(item.keybind !== undefined) {
        button.setAttribute("data-keybind", item.keybind);
      }

      if(item.role !== undefined) {
        switch(item.role) {
          case "back":
            button.addEventListener("click", (event) => {
              focusedTabView.focus();
              setTimeout(() => {
                focusedTabView.goBack();
              }, 1);
            });
            if(!focusedTabView.canGoBack()) {
              button.disabled = true;
            }
            break;
          case "forward":
            button.addEventListener("click", (event) => {
              focusedTabView.focus();
              setTimeout(() => {
                focusedTabView.goForward();
              }, 1);
            });
            if(!focusedTabView.canGoForward()) {
              button.disabled = true;
            }
            break;
          case "reload":
            button.addEventListener("click", (event) => {
              focusedTabView.focus();
              setTimeout(() => {
                focusedTabView.reload();
              }, 1);
            });
            break;
          case "addbookmark":
            button.addEventListener("click", (event) => {
              focusedTabView.focus();
              setTimeout(() => {
                bookmarkList.push({
                  title: focusedTabView.getTitle(),
                  url: focusedTabView.getURL()
                });
              }, 1);
            });
            break;
          case "copy":
            button.addEventListener("click", (event) => {
              focusedTabView.focus();
              setTimeout(() => {
                focusedTabView.copy();
              }, 1);
            });
            break;
          case "copy.url":
            button.addEventListener("click", (event) => {
              focusedTabView.focus();
              setTimeout(() => {
                focusedTabView.copy();
              }, 1);
            });
            break;
          case "paste":
            button.addEventListener("click", (event) => {
              focusedTabView.focus();
              setTimeout(() => {
                focusedTabView.paste();
              }, 1);
            });
            break;
          case "paste.style":
            button.addEventListener("click", (event) => {
              focusedTabView.focus();
              setTimeout(() => {
                focusedTabView.pasteAndMatchStyle();
              }, 1);
            });
            break;
          case "cut":
            button.addEventListener("click", (event) => {
              focusedTabView.focus();
              setTimeout(() => {
                focusedTabView.cut();
              }, 1);
            });
            break;
          case "selectall":
            button.addEventListener("click", (event) => {
              focusedTabView.focus();
              setTimeout(() => {
                focusedTabView.selectAll();
              }, 1);
            });
            break;
          case "undo":
            button.addEventListener("click", (event) => {
              focusedTabView.focus();
              setTimeout(() => {
                focusedTabView.undo();
              }, 1);
            });
            break;
          case "redo":
            button.addEventListener("click", (event) => {
              focusedTabView.focus();
              setTimeout(() => {
                focusedTabView.redo();
              }, 1);
            });
            break;
          case "inspect":
            button.addEventListener("click", (event) => {
              focusedTabView.focus();
              setTimeout(() => {
                focusedTabView.openDevTools();
              }, 1);
            });
            break;
          case "url":
            button.addEventListener("click", (event) => {
              focusedTabView.focus();
              setTimeout(() => {
                focusedTabView.src = item.url;
              }, 1);
            });
        }
      }

      button.addEventListener("click", (event) => {
        i.classList.remove("shown");
        k.classList.remove("disabled");
      });
    } else if(item.type == "hr") {
      var hr = document.createElement("hr");
      i.appendChild(hr);
    }
  });
  return i;
}
