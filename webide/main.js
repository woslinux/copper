"use strict";
const fs = require("fs");
var root = new TreeNode("MY PROJECT");
var treeView = new TreeView(root, "#sidebar-filesystem");
window.addEventListener("load", () => {
  root.setExpanded();
  initTree(configJson.project_dir, event, root);
});
var configJson = JSON.parse(fs.readFileSync("webide/settings.json"));
document.getElementById("toolbar-header").innerText = configJson.project_name;
function initTree(dir, event, parent) {
  const fs = require("fs");
  const path = require("path");
  fs.readdir(path.join(dir), (error, files) => {
    if(error) {
      return console.log(`Unable to scan directory: ${error}`);
    } 
    files.forEach((file) => {
      fs.stat(`${dir}/${file}`, (error, stats) => {
        if(error) {
          throw error;
        } else {
          if(stats.isDirectory()) {
            var i = new TreeNode(file);
            parent.addChild(i);
            i.on("click", () => {
              var li = document.querySelectorAll(".tj_description");
              li.forEach((element) => {
                var li1 = element.children[0].children[0];
                if(element.innerText.endsWith(".js") || element.innerText.endsWith(".js")) {
                  li1.src = "modules/icons/file_script.png";
                } else if(element.innerText.endsWith(".xml") || element.innerText.endsWith(".html") || element.innerText.endsWith(".xhtml") || element.innerText.endsWith(".svg")) {
                  li1.src = "modules/icons/file_xml.png";
                } else if(element.innerText.endsWith(".css") || element.innerText.endsWith(".scss")) {
                  li1.src = "modules/icons/file_style.png";
                } else if(element.innerText.startsWith(".") || element.innerText.endsWith(".mk") || element.innerText.endsWith(".ini")) {
                  li1.src = "modules/icons/file_config.png";
                }
              });
            });
//             initTree(`${dir}/${file}`, event, i);
          } else {
            setTimeout(() => {
              var i = new TreeNode(file);
              parent.addChild(i);
              i.on("click", () => {
                TextEditor.open(`${configJson.project_dir}/${file}`, "javascript");
              });
            }, 1);
          }
        }
      });
      treeView.reload();
    });
  });
}
