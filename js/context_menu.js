"use strict";
document.getElementById("find-text").addEventListener("click", (event) => {
  var i = document.getElementById("context-menu");
  var j = document.getElementById("tab-views");
  j.addEventListener("pointerup", (event) => {
    if(i.classList.contains("shown")) {
      document.querySelector(`webview.tab-webview[tab-id="${selectedTab}"]`).stopFindInPage("clearSelection");
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
  var i1 = document.querySelector(`webview.tab-webview[tab-id="${selectedTab}"]`);
  setTimeout(() => {
    l.focus();
  }, 250);
  i.style.height = "123px";
});
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
  children[2].value = document.querySelector(`webview.tab-webview[tab-id="${selectedTab}"]`).getTitle();
  children[2].style.width = "100%";
  children[2].style.setProperty("box-sizing", "border-box");
  children[3].setAttribute("data-l10n-id", "addBookmark-url");
  children[4].type = "text";
  children[4].value = document.querySelector(`webview.tab-webview[tab-id="${selectedTab}"]`).getURL();
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
document.getElementById("downloads").addEventListener("click", (event) => {
  const fs = require("fs");
  const { shell } = require("electron");
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
    downloadsPath = `C:\\Users\\${process.env.USER}\\Downloads`;
  } else if(process.platform == "darwin" || process.platform == "wos") {
    downloadsPath = `/Users/${process.env.USER}/Downloads`;
  } else {
    downloadsPath = `/home/${process.env.USER}/Downloads`;
  }
  children[1].addEventListener("click", (event) => {
    shell.openPath(downloadsPath);
  });

  children[3].style.height = "376px";

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

  i.style.height = "480px";
});

document.getElementById("options").addEventListener("click", (event) => {
  var i = document.getElementById("context-menu");
  var j = document.getElementById("tab-views");
  var k = document.querySelector(`webview.tab-webview[tab-id="${selectedTab}"]`);

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
    i.innerHTML = "";
    var childrenHistory = [
      document.createElement("button"),
      document.createElement("header"),
      document.createElement("button"),
      document.createElement("hr"),
      document.createElement("div")
    ];

    childrenHistory[0].classList.add("cm-back");
    childrenHistory[0].addEventListener("click", (event) => {
      document.getElementById("options").click();
    });

    childrenHistory[1].setAttribute("data-l10n-id", "history");
    childrenHistory[1].style.float = "var(--float-dir-end)";
    childrenHistory[1].style.margin = "0 8px";
    childrenHistory[1].style.width = "calc(100% - 52px)";

    childrenHistory[2].setAttribute("data-l10n-id", "history-clear");
    childrenHistory[2].addEventListener("click", (event) => {
      historyList = [];
      localStorage.setItem("historyList", JSON.stringify(historyList));
      childrenHistory[4].innerHTML = "";
    });

    childrenHistory[4].style.height = "374px";

    // This Fixes a Bug Causing History To List From First To Recent And Not Recent To First.
    const arrayList = () => {
      var array = historyList.reverse();
      if(array == historyList) {
        return array.reverse();
      } else {
        return array;
      }
    };

    // This Lists Your History By Adding Labelled Buttons.
    arrayList().forEach((item, index) => {
      var l = document.createElement("button");
      l.style.float = "left";
      l.style.padding = "0 8px";
      l.addEventListener("click", (event) => {
        Browser.newTab(item.url, true);
      });

      var i1 = document.createElement("img");
      i1.src = `http://www.google.com/s2/favicons?domain=${item.url}`;
      i1.style.float = "var(--float-dir-start)";
      i1.style.margin = "7px";
      i1.style.width = "21px";
      l.appendChild(i1);

      var j1 = document.createElement("p");
      j1.style.float = "var(--float-dir-start)";
      j1.style.margin = "7px 8px";
      j1.style.overflow = "hidden";
      j1.style.textOverflow = "ellipsis";
      j1.style.whiteSpace = "nowrap";
      j1.style.width = "calc(100% - 91px)";
      j1.innerText = item.title;
      l.appendChild(j1);

      var k1 = document.createElement("button");
      k1.style.backgroundImage = "url(\"images/trash.png\")";
      k1.style.backgroundPosition = "center";
      k1.style.backgroundRepeat = "no-repeat";
      k1.style.backgroundSize = "24px";
      k1.style.float = "var(--float-dir-start)";
      k1.style.width = "40px";
      k1.addEventListener("pointerup", (event) => {
        event.preventDefault();
        historyList.splice(index, 1);
        k.remove();
        localStorage.setItem("historyList", JSON.stringify(historyList));
      });
      l.appendChild(k1);

      childrenHistory[4].appendChild(l);
    });

    childrenHistory.forEach((element) => {
      i.appendChild(element);
    });

    i.style.height = "480px";
  });

  children[5].addEventListener("click", (event) => {
    document.getElementById("downloads").click();
  });

  children[6].addEventListener("click", (event) => {
    document.getElementById("addons").click();
  });

  children[7].addEventListener("click", (event) => {
    i.innerHTML = "";
    var childrenSettings = [
      document.createElement("button"),
      document.createElement("header"),
      document.createElement("hr"),
      document.createElement("p"),
      document.createElement("select"),
      document.createElement("p"),
      document.createElement("input"),
      document.createElement("hr"),
      document.createElement("input"),
      document.createElement("label"),
      document.createElement("hr"),
      document.createElement("p"),
      document.createElement("span"),
      document.createElement("button"),
      document.createElement("button"),
      document.createElement("button"),
      document.createElement("hr"),
      document.createElement("input"),
      document.createElement("label"),
      document.createElement("input"),
      document.createElement("label")
    ];

    childrenSettings[0].classList.add("cm-back");
    childrenSettings[0].addEventListener("click", (event) => {
      document.getElementById("options").click();
    });

    childrenSettings[1].setAttribute("data-l10n-id", "settings");
    childrenSettings[1].style.float = "var(--float-dir-end)";
    childrenSettings[1].style.margin = "0 8px";
    childrenSettings[1].style.width = "calc(100% - 52px)";

    childrenSettings[3].setAttribute("data-l10n-id", "settings-language");
    childrenSettings[4].innerHTML = `
      <option>العربية</option>
      <option>English</option>
    `;
    childrenSettings[4].style.width = "100%";
    childrenSettings[4].addEventListener("change", (event) => {
      document.querySelector("meta[name=\"defaultLanguage\"]").content = languages[childrenSettings[4].selectedIndex];
    });

    childrenSettings[5].setAttribute("data-l10n-id", "settings-fontSize");
    childrenSettings[6].type = "number";
    childrenSettings[6].style.width = "100%";
    childrenSettings[6].style.setProperty("box-sizing", "border-box");
    childrenSettings[6].value = fontSize;
    childrenSettings[6].addEventListener("input", (event) => {
      localStorage.setItem("fontSize", childrenSettings[6].value);
      fontSize = localStorage.getItem("fontSize");
      document.querySelectorAll(`webview.tab-webview[tab-id]`).forEach((element) => {
        document.querySelector(`webview.tab-webview[tab-id="${selectedTab}"]`).insertCSS(`
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
            font-size: ${fontSize * 0.5}px;
          }
        `);
      });
    });

    childrenSettings[8].type = "checkbox";
    childrenSettings[8].checked = (localStorage.getItem("sidetabs") == "true");
    childrenSettings[8].id = "config-cb-sidetabs";
    childrenSettings[8].addEventListener("click", (event) => {
      document.getElementById("app-holder").classList.toggle("sidetabs");
      if(localStorage.getItem("sidetabs") == "true") {
        localStorage.setItem("sidetabs", false);
      } else if(localStorage.getItem("sidetabs") == "false") {
        localStorage.setItem("sidetabs", true);
      }
    });
    childrenSettings[9].for = childrenSettings[4].id;
    childrenSettings[9].setAttribute("data-l10n-id", "settings-sidetabs");
    childrenSettings[11].style.float = "var(--float-dir-start)";
    childrenSettings[11].style.width = "calc(100% - 64px)";

    childrenSettings[11].setAttribute("data-l10n-id", "settings-zoom");
    childrenSettings[12].innerText = `${k.zoomLevel * 100}%`;
    childrenSettings[12].style.float = "var(--float-dir-end)";
    childrenSettings[12].style.margin = "8px 0";
    childrenSettings[13].style.textAlign = "center";
    childrenSettings[13].style.width = "33.33%";
    childrenSettings[13].setAttribute("data-l10n-id", "settings-zoom-increment");
    childrenSettings[13].addEventListener("click", (event) => {
      if(k.zoomLevel <= 9) {
        k.zoomLevel += 0.25;
      } else {
        childrenSettings[13].disabled = true;
        childrenSettings[14].disabled = null;
        childrenSettings[15].disabled = null;
      }
      childrenSettings[12].innerText = `${k.zoomLevel * 100}%`;
    });
    childrenSettings[14].style.textAlign = "center";
    childrenSettings[14].style.width = "33.33%";
    childrenSettings[14].setAttribute("data-l10n-id", "settings-zoom-reset");
    childrenSettings[14].addEventListener("pointerup", (event) => {
      k.zoomLevel = 0;
      childrenSettings[13].disabled = null;
      childrenSettings[14].disabled = true;
      childrenSettings[15].disabled = null;
      childrenSettings[12].innerText = `${k.zoomLevel * 100}%`;
    });
    childrenSettings[15].style.textAlign = "center";
    childrenSettings[15].style.width = "33.33%";
    childrenSettings[15].setAttribute("data-l10n-id", "settings-zoom-decrement");
    childrenSettings[15].addEventListener("click", (event) => {
      if(k.zoomLevel >= -7.75) {
        k.zoomLevel -= 0.25;
      } else {
        childrenSettings[13].disabled = null;
        childrenSettings[14].disabled = null;
        childrenSettings[15].disabled = true;
      }
      childrenSettings[12].innerText = `${k.zoomLevel * 100}%`;
    });

    childrenSettings[17].type = "checkbox";
    childrenSettings[17].checked = (localStorage.getItem("gfxMode") == "true");
    childrenSettings[17].id = "config-cb-gfxmode";
    childrenSettings[17].addEventListener("click", (event) => {
      document.getElementById("app-holder").classList.toggle("gpu-capable");
      if(localStorage.getItem("gfxMode") == "true") {
        localStorage.setItem("gfxMode", false);
      } else {
        localStorage.setItem("gfxMode", true);
      }
    });
    childrenSettings[18].for = childrenSettings[17].id;
    childrenSettings[18].setAttribute("data-l10n-id", "settings-gfxMode");

    childrenSettings[19].type = "checkbox";
    childrenSettings[19].checked = (localStorage.getItem("gamerMode") == "true");
    childrenSettings[19].id = "config-cb-gamerMode";
    childrenSettings[19].addEventListener("click", (event) => {
      document.getElementById("app-holder").classList.toggle("gamermode");
      if(localStorage.getItem("gamerMode") == "true") {
        localStorage.setItem("gamerMode", false);
      } else {
        localStorage.setItem("gamerMode", true);
      }
    });
    childrenSettings[20].for = childrenSettings[18].id;
    childrenSettings[20].setAttribute("data-l10n-id", "settings-gamerMode");

    childrenSettings.forEach((element) => {
      i.appendChild(element);
    });

    i.style.height = "480px";
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
