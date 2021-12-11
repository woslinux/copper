"use strict";
function openHistory(parent) {
  parent.innerHTML = "";

  var children = [
    document.createElement("button"),
    document.createElement("header"),
    document.createElement("button"),
    document.createElement("hr"),
    document.createElement("div")
  ];

  children[0].classList.add("cm-back");
  children[0].addEventListener("click", (event) => {
    document.getElementById("options").click();
  });

  children[1].setAttribute("data-l10n-id", "history");
  children[1].style.float = "var(--float-end)";
  children[1].style.margin = "0 8px";
  children[1].style.width = "calc(100% - 52px)";

  children[2].setAttribute("data-l10n-id", "history-clear");
  children[2].addEventListener("click", (event) => {
    historyList = [];
    localStorage.setItem("historyList", JSON.stringify(historyList));
    children[4].innerHTML = "";
  });

  children[4].style.height = "374px";

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
    i1.style.float = "var(--float-start)";
    i1.style.margin = "7px";
    i1.style.width = "21px";
    l.appendChild(i1);

    var j1 = document.createElement("p");
    j1.style.float = "var(--float-start)";
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
    k1.style.float = "var(--float-start)";
    k1.style.width = "40px";
    k1.addEventListener("pointerup", (event) => {
      event.preventDefault();
      historyList.splice(index, 1);
      k.remove();
      localStorage.setItem("historyList", JSON.stringify(historyList));
    });
    l.appendChild(k1);

    children[4].appendChild(l);
  });

  children.forEach((element) => {
    parent.appendChild(element);
  });

  parent.style.height = "480px";
};
