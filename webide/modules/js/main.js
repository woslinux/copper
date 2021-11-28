"use strict";
function initializeTree() {
  const fs = require("fs");
  const path = require("path");
  var root = new TreeNode("MY PROJECT");
  fs.readdir(path.join("project"), (error, files) => {
    if(error) {
      return console.log("Unable to scan directory: " + error);
    } 
    files.forEach((file) => {
      console.log(file);
      var i = new TreeNode(file);
      i.addChild(root);
    });
  });
  var treeView = new TreeView(root, "#app-sidebar-filesystem");
}
var textArea = document.getElementById("app-text-editor");
CodeMirror(textArea, {
  mode: "javascript",
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
var appToolbarChildrens = [
  document.getElementById("app-toolbar-file"),
  document.getElementById("app-toolbar-edit"),
  document.getElementById("app-toolbar-view")
];
document.addEventListener("pointerup", (event) => {
  appToolbarChildrens[0].classList.remove("selected");
  appToolbarChildrens[1].classList.remove("selected");
  appToolbarChildrens[2].classList.remove("selected");
  document.getElementById("app-toolbar-content-file").classList.remove("shown");
  document.getElementById("app-toolbar-content-edit").classList.remove("shown");
  document.getElementById("app-toolbar-content-view").classList.remove("shown");
});
appToolbarChildrens[0].addEventListener("click", (event) => {
  document.getElementById("app-toolbar-content-file").style.left = `${event.target.offsetLeft}px`;
  document.getElementById("app-toolbar-content-file").classList.add("shown");
  event.target.classList.add("selected");
});
appToolbarChildrens[1].addEventListener("click", (event) => {
  document.getElementById("app-toolbar-content-edit").style.left = `${event.target.offsetLeft}px`;
  document.getElementById("app-toolbar-content-edit").classList.add("shown");
  event.target.classList.add("selected");
});
appToolbarChildrens[2].addEventListener("click", (event) => {
  document.getElementById("app-toolbar-content-view").style.left = `${event.target.offsetLeft}px`;
  document.getElementById("app-toolbar-content-view").classList.add("shown");
  event.target.classList.add("selected");
});
