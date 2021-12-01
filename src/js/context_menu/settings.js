"use strict";
function openSettings(parent) {
  parent.innerHTML = "";
  var k = document.querySelector(`webview.tab-webview[data-uuid="${selectedTab}"]`);

  var children = [
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
    document.createElement("label"),
    document.createElement("p"),
    document.createElement("input")
  ];

  children[0].classList.add("cm-back");
  children[0].addEventListener("click", (event) => {
    document.getElementById("options").click();
  });

  children[1].setAttribute("data-l10n-id", "settings");
  children[1].style.float = "var(--float-dir-end)";
  children[1].style.margin = "0 8px";
  children[1].style.width = "calc(100% - 52px)";

  children[3].setAttribute("data-l10n-id", "settings-language");
  children[4].innerHTML = `
    <option>العربية</option>
    <option>English</option>
  `;
  children[4].style.width = "100%";
  children[4].addEventListener("change", (event) => {
    document.querySelector("meta[name=\"defaultLanguage\"]").content = languages[children[4].selectedIndex];
  });

  children[5].setAttribute("data-l10n-id", "settings-fontSize");
  children[6].type = "number";
  children[6].style.width = "100%";
  children[6].style.setProperty("box-sizing", "border-box");
  children[6].value = fontSize;
  children[6].addEventListener("input", (event) => {
    localStorage.setItem("fontSize", children[6].value);
    fontSize = localStorage.getItem("fontSize");
    document.querySelectorAll(`webview.tab-webview[data-uuid]`).forEach((element) => {
      document.querySelector(`webview.tab-webview[data-uuid="${selectedTab}"]`).insertCSS(`
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

  children[8].type = "checkbox";
  children[8].checked = (localStorage.getItem("sidetabs") == "true");
  children[8].id = "config-cb-sidetabs";
  children[8].addEventListener("click", (event) => {
    document.getElementById("app-holder").classList.toggle("sidetabs");
    if(localStorage.getItem("sidetabs") == "true") {
      localStorage.setItem("sidetabs", false);
    } else if(localStorage.getItem("sidetabs") == "false") {
      localStorage.setItem("sidetabs", true);
    }
  });
  children[9].for = children[4].id;
  children[9].setAttribute("data-l10n-id", "settings-sidetabs");
  children[11].style.float = "var(--float-dir-start)";
  children[11].style.width = "calc(100% - 64px)";

  children[11].setAttribute("data-l10n-id", "settings-zoom");
  children[12].innerText = `${k.zoomLevel * 100}%`;
  children[12].style.float = "var(--float-dir-end)";
  children[12].style.margin = "8px 0";
  children[13].style.textAlign = "center";
  children[13].style.width = "33.33%";
  children[13].setAttribute("data-l10n-id", "settings-zoom-increment");
  children[13].addEventListener("click", (event) => {
    if(k.zoomLevel <= 9) {
      k.zoomLevel += 0.25;
    } else {
      children[13].disabled = true;
      children[14].disabled = null;
      children[15].disabled = null;
    }
    children[12].innerText = `${k.zoomLevel * 100}%`;
  });
  children[14].style.textAlign = "center";
  children[14].style.width = "33.33%";
  children[14].setAttribute("data-l10n-id", "settings-zoom-reset");
  children[14].addEventListener("pointerup", (event) => {
    k.zoomLevel = 0;
    children[13].disabled = null;
    children[14].disabled = true;
    children[15].disabled = null;
    children[12].innerText = `${k.zoomLevel * 100}%`;
  });
  children[15].style.textAlign = "center";
  children[15].style.width = "33.33%";
  children[15].setAttribute("data-l10n-id", "settings-zoom-decrement");
  children[15].addEventListener("click", (event) => {
    if(k.zoomLevel >= -7.75) {
      k.zoomLevel -= 0.25;
    } else {
      children[13].disabled = null;
      children[14].disabled = null;
      children[15].disabled = true;
    }
    children[12].innerText = `${k.zoomLevel * 100}%`;
  });

  children[17].type = "checkbox";
  children[17].checked = (localStorage.getItem("gfxMode") == "true");
  children[17].id = "config-cb-gfxmode";
  children[17].addEventListener("click", (event) => {
    document.getElementById("app-holder").classList.toggle("gpu-capable");
    if(localStorage.getItem("gfxMode") == "true") {
      localStorage.setItem("gfxMode", false);
    } else {
      localStorage.setItem("gfxMode", true);
    }
  });
  children[18].for = children[17].id;
  children[18].setAttribute("data-l10n-id", "settings-gfxMode");

  children[19].type = "checkbox";
  children[19].checked = (localStorage.getItem("gamerMode") == "true");
  children[19].id = "config-cb-gamerMode";
  children[19].addEventListener("click", (event) => {
    document.getElementById("app-holder").classList.toggle("gamermode");
    if(localStorage.getItem("gamerMode") == "true") {
      localStorage.setItem("gamerMode", false);
    } else {
      localStorage.setItem("gamerMode", true);
    }
  });
  children[20].for = children[18].id;
  children[20].setAttribute("data-l10n-id", "settings-gamerMode");

  children[21].setAttribute("data-l10n-id", "settings-accentColor");
  children[22].type = "color";
  children[22].addEventListener("change", (event) => {
    document.getElementById("app-holder").style.setProperty("--accent-color", children[22].value);
    localStorage.setItem("accentColor", children[22].value);
  });

  children.forEach((element) => {
    parent.appendChild(element);
  });

  parent.style.height = "480px";
}
