var selectedTab = 0;
var TextEditor = {
  open: (file = "", syntax = "javascript") => {
    const fs = require("fs");
    const uuid = require("uuid");
    var i = document.getElementById("text-editor-tabs");
    var j = document.createElement("button");
    j.classList.add("tab");
    j.draggable = true;
    j.style.order = document.querySelectorAll(`button.tab[tab-id]`).length;
    j.setAttribute("tab-id", uuid.v4());
    j.addEventListener("pointerdown", (event) => {
      TextEditor.focus(j.getAttribute("tab-id"));
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
    l.innerText = file.split("/")[file.split("/").length];
    j.appendChild(l);
    var i1 = document.createElement("span");
    i1.classList.add("tab-close");
    i1.userAgent = navigator.userAgent;
    i1.addEventListener("click", (event) => {
      j.remove();
      l1.remove();
      if(j.previousElementSibling) {
        TextEditor.focus(j.previousElementSibling.getAttribute("tab-id"));
      } else if(j.nextElementSibling) {
        TextEditor.focus(j.nextElementSibling.getAttribute("tab-id")).click();
      }
    });
    j.appendChild(i1);
    var j1 = document.getElementById("text-editor-views");
    var l1 = document.createElement("div");
    l1.classList.add("text-editor");
    l1.setAttribute("tab-id", j.getAttribute("tab-id"));
    var i2 = CodeMirror(l1, {
      mode: syntax,
      lineNumbers: true,
      indentAuto: true,
      newlineAndIndent: true,
      tabSize: 2,
      smartIndent: true,
      autofocus: true,
      dragDrop: true,
      spellcheck: true,
      autocorrect: true,
      autocapitalize: true
    });
//     if(i2.getDoc().getLine(i2.getDoc().getCursor().line).length === 0) {
//       i2.getDoc().replaceRange(fs.readFileSync(file), i2.getDoc().getCursor().line);
//     } else {
//       i2.getDoc().replaceRange(`\n${fs.readFileSync(file)}`, i2.getDoc().getCursor().line);
//     }
    j1.appendChild(l1);
    i.appendChild(j);
    TextEditor.focus(j.getAttribute("tab-id"));
  },
  focus: (uuid) => {
    var i = document.querySelector(`button.tab[tab-id="${uuid}"]`);
    var j = document.querySelector(`div.text-editor[tab-id="${uuid}"]`);
    var deselect = document.querySelectorAll("button.tab[tab-id], webview.tab-webview[tab-id]");
    deselect.forEach((element) => {
      element.classList.remove("selected");
    });
    i.classList.add("selected");
    j.classList.add("selected");
    selectedTab = uuid;
    j.focus();
  }
};