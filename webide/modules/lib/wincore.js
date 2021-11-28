"use strict";
// const { remote } = require("electron");
// var win = remote.BrowserWindow.getFocusedWindow();
// window.addEventListener("resize", (event) => {
//   if(win.isMaximized()) {
//     document.getElementById("app-holder").classList.add("maximized");
//   } else {
//     document.getElementById("app-holder").classList.remove("maximized");
//   }
//   if(win.isFullScreen()) {
//     document.getElementById("app-holder").classList.add("fullscreen");
//   } else {
//     document.getElementById("app-holder").classList.remove("fullscreen");
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
const homeURL = "https://www.google.com/";
window.onload = () => {
  const { ipcRenderer } = require("electron");
  if(localStorage.getItem("fontSize") !== null) {
    fontSize = JSON.parse(localStorage.getItem("fontSize"));
  }
  if(localStorage.getItem("historyList") !== null) {
    historyList = JSON.parse(localStorage.getItem("historyList"));
  }
  if(localStorage.getItem("bookmarkList") !== null) {
    bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
  }
  Browser.newTab();
  var newTabButton = document.getElementById("newtab");
  var sideTabsButton = document.getElementById("sidetabs");
  newTabButton.addEventListener("pointerup", (event) => {
    Browser.newTab();
  });
  sideTabsButton.addEventListener("pointerup", (event) => {
    document.getElementById("app-holder").classList.toggle("sidetabs");
    if(localStorage.getItem("sidetabs") == "true") {
      localStorage.setItem("sidetabs", false);
    } else {
      localStorage.setItem("sidetabs", true);
    }
  });
  document.addEventListener("keydown", (event) => {
    if(event.keyCode == 17 && event.keyCode == 9) {
      var i = document.querySelectorAll(`button.tab[tab-id]`);
      if(counter < i.length - 1) {
        Browser.focus(i[counter].nextElementSibling.getAttribute("tab-id"));
        counter += 1;
      } else {
        Browser.focus(i[0].getAttribute("tab-id"));
        counter = 0;
      }
    }
  });
  if(localStorage.getItem("sidetabs") == "true") {
    document.getElementById("app-holder").classList.add("sidetabs");
  }
  if(localStorage.getItem("gfxMode") == "true") {
    document.getElementById("app-holder").classList.add("gpu-capable");
  }
  document.getElementById("addons").addEventListener("click", (event) => {
    ipcRenderer.invoke("addons");
  });  
  document.getElementById("urlbar").addEventListener("focus", (event) => {
    event.target.select();
  });
};
var Browser = {
  newTab: (href = homeURL, selected = true) => {
    const uuid = require("uuid");
    var i = document.getElementById("tabs");
    var j = document.createElement("button");
    j.classList.add("tab");
    j.draggable = true;
    j.style.order = document.querySelectorAll(`button.tab[tab-id]`).length;
    j.setAttribute("tab-id", uuid.v4());
    j.addEventListener("pointerdown", (event) => {
      Browser.focus(j.getAttribute("tab-id"));
    });
    j.addEventListener("dragstart", (event) => {
      j.style.opacity = 0.5;
      event.dataTransfer.setData("text", event.target.getAttribute("tab-id"));
    });
    j.addEventListener("dragover", (event) => {
      event.preventDefault();
      if(!j.classList.contains("selected")) {
        j.classList.add("drag");
      }
    });
    j.addEventListener("dragleave", (event) => {
      if(!j.classList.contains("selected")) {
        j.classList.remove("drag");
      }
    });
    j.addEventListener("dragend", (event) => {
      j.style.opacity = null;
      document.querySelectorAll(`button.tab[tab-id]`).forEach((element) => {
        if(!element.classList.contains("selected")) {
          element.classList.remove("drag");
        }
      });
    });
    j.addEventListener("drop", (event) => {
      event.preventDefault();
      var data = document.querySelector(`button.tab[tab-id="${event.dataTransfer.getData("text")}"]`);
      localStorage.setItem("lastTabOrder", j.style.order);
      j.style.order = data.style.order;
      data.style.order = localStorage.getItem("lastTabOrder");
    });
    var k = document.createElement("img");
    k.classList.add("tab-icon");
    j.appendChild(k);
    var l = document.createElement("p");
    l.classList.add("tab-title");
    l.style.width = "calc(100% - 48px)";
    j.appendChild(l);
    var i1 = document.createElement("span");
    i1.classList.add("tab-close");
    i1.userAgent = navigator.userAgent;
    i1.addEventListener("click", (event) => {
      j.remove();
      l1.remove();
      if(j.previousElementSibling) {
        Browser.focus(j.previousElementSibling.getAttribute("tab-id"));
      } else {
        if(j.nextElementSibling) {
          Browser.focus(j.nextElementSibling.getAttribute("tab-id")).click();
        } else {
          Browser.focus(document.querySelectorAll("button.tab[tab-id]")[0].getAttribute("tab-id"));
        }
      }
      if(document.querySelectorAll("button.tab[tab-id]").length < 1) {
        window.close();
      }
    });
    j.appendChild(i1);
    var j1 = document.createElement("span");
    j1.classList.add("tab-audio");
    j1.style.display = "none";
    j1.addEventListener("pointerup", (event) => {
      if(l1.isAudioMuted()) {
        l1.setAudioMuted(false);
        j1.classList.remove("muted");
      } else {
        l1.setAudioMuted(true);
        j1.classList.add("muted");
      }
    });
    j.appendChild(j1);
    var k1 = document.getElementById("tab-views");
    var l1 = document.createElement("webview");
    l1.classList.add("tab-webview");
    l1.src = href;
    l1.setAttribute("tab-id", j.getAttribute("tab-id"));
    l1.addEventListener("did-start-loading", (event) => {
      k.src = "images/loading.png";
      document.getElementById("reload").classList.add("stop");
    });
    l1.addEventListener("did-fail-load", (event) => {
      l1.src = "net_error.html";
    });
    l1.addEventListener("did-stop-loading", (event) => {
      document.getElementById("reload").classList.remove("stop");
      if(l1.getURL().startsWith("file://")) {
        document.getElementById("security").classList.add("file");
        document.getElementById("security").classList.remove("https");
      } else if(l1.getURL().startsWith("https://")) {
        document.getElementById("security").classList.remove("file");
        document.getElementById("security").classList.add("https");
      } else {
        document.getElementById("security").classList.remove("file");
        document.getElementById("security").classList.remove("https");
      }
      if(l1.getURL() == `file://${__dirname}/net_error.html`) {
        document.getElementById("urlbar").style.color = "#c04040";
      } else {
        document.getElementById("urlbar").style.color = null;
        document.getElementById("urlbar").value = l1.getURL();
      }
      historyList.push({
        title: l1.getTitle(),
        url: l1.getURL()
      });
      localStorage.setItem("historyList", JSON.stringify(historyList));
    });
    l1.addEventListener("dom-ready", (event) => {
      document.getElementById("reload").classList.remove("stop");
      if(l1.getURL().startsWith("file://")) {
        document.getElementById("security").classList.add("file");
        document.getElementById("security").classList.remove("https");
      } else if(l1.getURL().startsWith("https://")) {
        document.getElementById("security").classList.remove("file");
        document.getElementById("security").classList.add("https");
      } else {
        document.getElementById("security").classList.remove("file");
        document.getElementById("security").classList.remove("https");
      }
      if(l1.canGoBack()) {
        document.getElementById("back").disabled = false;
      } else {
        document.getElementById("back").disabled = true;
      }
      if(l1.canGoForward()) {
        document.getElementById("forward").disabled = false;
      } else {
        document.getElementById("forward").disabled = true;
      }
      if(l1.getURL() == `file://${__dirname}/net_error.html`) {
        document.getElementById("urlbar").style.color = "#c04040";
      } else {
        document.getElementById("urlbar").style.color = null;
        document.getElementById("urlbar").value = l1.getURL();
      }
      if(process.platform == "linux" || process.platform == "darwin") {
        l1.insertCSS(`
          :focus-visible {
            outline: 1px dotted #00c0ff;
          }
          ::-webkit-scrollbar {
            background-color: rgba(0, 0, 0, 0.125);
            display: block;
            width: 16px;
            height: 16px;
          }
          ::-webkit-scrollbar-corner {
            background-color: rgba(0, 0, 0, 0.125);
          }
          ::-webkit-scrollbar-thumb {
            background-clip: content-box;
            background-color: #808080;
            border: 4px solid transparent;
            border-radius: 2rem;
          }
          ::-webkit-scrollbar-thumb:hover {
            background-color: #707070;
          }
          ::-webkit-scrollbar-thumb:active {
            background-color: #606060;
          }
          ::-webkit-scrollbar-track {
            background-color: transparent;
          }
        `);
      } else {
        l1.insertCSS(`
          :focus-visible {
            outline: 1px solid #00c0ff;
          }
          ::-webkit-scrollbar {
            background-color: #c0c0c0;
            display: block;
            width: 16px;
            height: 16px;
          }
          ::-webkit-scrollbar-button:single-button {
            background: #c0c0c0 center no-repeat;
            background-size: 12px;
            border-radius: 0;
            display: block;
            height: 16px;
            width: 16px;
          }
          ::-webkit-scrollbar-button:single-button:hover {
            background-color: #b0b0b0;
          }
          ::-webkit-scrollbar-button:single-button:active {
            background-color: #a0a0a0;
          }
          ::-webkit-scrollbar-button:single-button:decrement {
            background-image: url("https://img.icons8.com/fluency-systems-regular/16/000000/collapse-arrow--v2.png");
          }
          ::-webkit-scrollbar-button:single-button:increment {
            background-image: url("https://img.icons8.com/fluency-systems-regular/16/000000/expand-arrow--v1.png");
          }
          ::-webkit-scrollbar-corner {
            background-color: rgba(0, 0, 0, 0.125);
          }
          ::-webkit-scrollbar-thumb {
            background-clip: content-box;
            background-color: #808080;
            border: none;
            border-radius: 0;
          }
          ::-webkit-scrollbar-thumb:hover {
            background-color: #707070;
          }
          ::-webkit-scrollbar-thumb:active {
            background-color: #606060;
          }
          ::-webkit-scrollbar-track {
            background-color: transparent;
          }
        `);
      }
      l1.insertCSS(`
        h1 {
          font-size: ${parseInt(fontSize * 2)}px;
        }
        h2 {
          font-size: ${parseInt(fontSize * 1.56)}px;
        }
        h3 {
          font-size: ${parseInt(fontSize * 1.23)}px;
        }
        h4 {
          font-size: ${parseInt(fontSize * 1)}px;
        }
        h5 {
          font-size: ${parseInt(fontSize * 0.84)}px;
        }
        h6 {
          font-size: ${parseInt(fontSize * 0.67)}px;
        }
        html, p {
          font-size: ${parseInt(fontSize)}px;
        }
        small {
          font-size: ${parseInt(fontSize * 0.5)}px;
        }
      `);
    });
    l1.addEventListener("page-favicon-updated", (event) => {
      k.src = event.favicons[0];
    });
    l1.addEventListener("page-title-updated", (event) => {
      l.innerText = event.title;
    });
    l1.addEventListener("did-change-theme-color", (event) => {
      // theme color...
    });
    l1.addEventListener("media-started-playing", (event) => {
      j1.style.display = "block";
      l.style.width = null;
    });
    l1.addEventListener("media-paused", (event) => {
      j1.style.display = "none";
      l.style.width = "calc(100% - 48px)";
    });
    l1.addEventListener("context-menu", (event) => {
      var i2 = document.getElementById("context-menu");
      var j2 = document.getElementById("tab-views");
      j2.addEventListener("pointerup", (event) => {
        if(i2.classList.contains("shown")) {
          i2.classList.remove("shown");
          j2.classList.remove("disabled");
          setTimeout(() => {
            i2.style = null;
          }, 250);
        }
      });
      setTimeout(() => {
        i2.style.left = `${event.params.x}px`;
        i2.style.right = "auto";
        i2.style.top = `${event.params.y}px`;
        if(i2.offsetLeft >= (l1.getBoundingClientRect().width - i2.getBoundingClientRect().width)) {
          i2.style.left = `${l1.getBoundingClientRect().width - i2.getBoundingClientRect().width}px`;
        }
        if(i2.offsetTop >= (l1.getBoundingClientRect().height - i2.getBoundingClientRect().height + 81)) {
          i2.style.top = `${l1.getBoundingClientRect().height - i2.getBoundingClientRect().height + 81}px`;
        }
        i2.classList.add("shown");
        j2.classList.add("disabled");
      }, 125);
      i2.innerHTML = "";
      var children = [
        document.createElement("button"),
        document.createElement("button"),
        document.createElement("button"),
        document.createElement("button"),
        document.createElement("hr"),
        document.createElement("button"),
        document.createElement("hr"),
        document.createElement("button"),
        document.createElement("button"),
        document.createElement("hr"),
        document.createElement("button")
      ];
      children[0].setAttribute("data-l10n-id", "copy");
      children[0].setAttribute("data-keybind", "Ctrl+C");
      children[1].setAttribute("data-l10n-id", "paste");
      children[1].setAttribute("data-keybind", "Ctrl+V");
      children[2].setAttribute("data-l10n-id", "pasteStyled");
      children[3].setAttribute("data-l10n-id", "cut");
      children[3].setAttribute("data-keybind", "Ctrl+X");
      children[5].setAttribute("data-l10n-id", "selectAll");
      children[5].setAttribute("data-keybind", "Ctrl+A");
      children[7].setAttribute("data-l10n-id", "undo");
      children[7].setAttribute("data-keybind", "Ctrl+Z");
      children[8].setAttribute("data-l10n-id", "redo");
      children[8].setAttribute("data-keybind", "Ctrl+U");
      children[10].setAttribute("data-l10n-id", "inspectElement");
      children[0].addEventListener("click", (event) => {
        l1.focus();
        setTimeout(() => {
          l1.copy();
        }, 1);
      });
      children[1].addEventListener("click", (event) => {
        l1.focus();
        setTimeout(() => {
          l1.paste();
        }, 1);
      });
      children[2].addEventListener("click", (event) => {
        l1.focus();
        setTimeout(() => {
          l1.pasteAndMatchStyle();
        }, 1);
      });
      children[3].addEventListener("click", (event) => {
        l1.focus();
        setTimeout(() => {
          l1.cut();
        }, 1);
      });
      children[5].addEventListener("click", (event) => {
        l1.focus();
        setTimeout(() => {
          l1.selectAll();
        }, 1);
      });
      children[7].addEventListener("click", (event) => {
        l1.focus();
        setTimeout(() => {
          l1.undo();
        }, 1);
      });
      children[8].addEventListener("click", (event) => {
        l1.focus();
        setTimeout(() => {
          l1.redo();
        }, 1);
      });
      children[10].addEventListener("click", (event) => {
        l1.focus();
        setTimeout(() => {
          l1.openDevTools();
        }, 1);
      });
      children.forEach((element) => {
        element.addEventListener("click", (event) => {
          i2.classList.remove("shown");
          j2.classList.remove("disabled");
          setTimeout(() => {
            i2.style = null;
          }, 250);
        });
        i2.appendChild(element);
      });
      i2.style.height = null;
    });
    l1.addEventListener("new-window", async (event) => {
      console.log(event);
      Browser.newTab(event.url);
    });
    k1.appendChild(l1);
    if(selected) {
      setTimeout(() => {
        Browser.focus(j.getAttribute("tab-id"));
      }, 10);
    }
    var j2 = document.createElement("div");
    j2.classList.add("tab-info");
    var childrenInfo = [
      document.createElement("img"),
      document.createElement("p"),
      document.createElement("p"),
      document.createElement("hr"),
      document.createElement("p")
    ];
    childrenInfo[0].classList.add("tab-icon");
    childrenInfo[1].classList.add("tab-title");
    childrenInfo[1].style.width = "calc(100% - 24px)";
    childrenInfo.forEach((element) => {
      j2.appendChild(element);
    });
    j.appendChild(j2);
    j.addEventListener("pointerenter", (event) => {
      j.style.zIndex = 6;
      childrenInfo[0].src = k.src;
      childrenInfo[1].innerText = l.innerText;
      childrenInfo[2].innerText = l1.getURL();
      childrenInfo[2].style.opacity = 0.5;
      childrenInfo[2].style.overflow = "hidden";
      childrenInfo[2].style.textOverflow = "ellipsis";
      childrenInfo[2].style.width = "100%";
      childrenInfo[4].setAttribute("data-l10n-id", "tab-audible");
      j2.classList.add("shown");
      if(l1.isCurrentlyAudible()) {
        childrenInfo[3].style.display = "block";
        childrenInfo[4].style.display = "block";
      } else {
        childrenInfo[3].style.display = "none";
        childrenInfo[4].style.display = "none";
      }
    });
    j.addEventListener("pointerleave", (event) => {
      j.style.zIndex = null;
      j2.classList.remove("shown");
    });
    i.appendChild(j);
    document.getElementById("back").addEventListener("pointerup", (event) => {
      event.preventDefault();
      if(selectedTab == j.getAttribute("tab-id")) {
        l1.goBack();
      }
    });
    document.getElementById("forward").addEventListener("pointerup", (event) => {
      event.preventDefault();
      if(selectedTab == j.getAttribute("tab-id")) {
        l1.goForward();
      }
    });
    document.getElementById("reload").addEventListener("pointerup", (event) => {
      event.preventDefault();
      if(selectedTab == j.getAttribute("tab-id")) {
        if(l1.isLoading()) {
          l1.stop();
        } else {
          l1.reload();
        }
      }
    });
    document.getElementById("home").addEventListener("pointerup", (event) => {
      if(selectedTab == j.getAttribute("tab-id")) {
        l1.src = homeURL;
      }
    });
    document.getElementById("urlbar").addEventListener("keydown", (event) => {
      if(event.keyCode == 13) {
        event.target.blur();
        if(selectedTab == j.getAttribute("tab-id")) {
          if(event.target.value.startsWith("file://")
            || event.target.value.startsWith("http://")
            || event.target.value.startsWith("https://")) {
            l1.src = event.target.value;
          } else if(event.target.value.startsWith("/")) {
            if(process.platform == "win32") {
              l1.src = `file://C:${event.target.value}`;
            } else {
              l1.src = `file://${event.target.value}`;
            }
          } else {
            if(event.target.value.includes(".")
            && !event.target.value.startsWith("/")
            && !event.target.value.startsWith("file://")
            && !event.target.value.startsWith("http://")
            && !event.target.value.startsWith("https://")) {
              l1.src = `https://${event.target.value}`;
            } else {
              l1.src = `https://www.google.com/search?q=${event.target.value}`;
            }
          }
        }
      }
    });
    window.addEventListener("keydown", (event) => {
      if(event.keyCode == 122) {
        if(document.fullscreen) {
          document.exitFullscreen();
          document.getElementById("app-holder").classList.remove("fullscreen");
        } else {
          document.body.requestFullscreen();
          document.getElementById("app-holder").classList.add("fullscreen");
        }
      }
      if(event.keyCode == 123) {
        if(l1.isDevToolsOpened()) {
          l1.closeDevTools();
        } else {
          l1.openDevTools();
        }
      }
    });
  },
  focus: (uuid) => {
    var i = document.querySelector(`button.tab[tab-id="${uuid}"]`);
    var j = document.querySelector(`webview.tab-webview[tab-id="${uuid}"]`);
    var deselect = document.querySelectorAll("button.tab[tab-id], webview.tab-webview[tab-id]");
    deselect.forEach((element) => {
      element.classList.remove("selected");
    });
    i.classList.add("selected");
    j.classList.add("selected");
    selectedTab = uuid;
    if(j.canGoBack()) {
      document.getElementById("back").disabled = false;
    } else {
      document.getElementById("back").disabled = true;
    }
    if(j.canGoForward()) {
      document.getElementById("forward").disabled = false;
    } else {
      document.getElementById("forward").disabled = true;
    }
    if(j.getURL() == `file://${__dirname}/net_error.html`) {
      document.getElementById("urlbar").style.color = "#ff4040";
    } else {
      document.getElementById("urlbar").style.color = null;
      document.getElementById("urlbar").value = j.getURL();
    }
    if(j.getURL().startsWith("file://")) {
      document.getElementById("security").classList.add("file");
      document.getElementById("security").classList.remove("https");
    } else {
      document.getElementById("security").classList.remove("file");
      document.getElementById("security").classList.remove("https");
    }
    j.focus();
  }
};
