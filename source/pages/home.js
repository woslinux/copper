"use strict";

window.top.document.getElementById("navbar-urlbar").value = "";
window.addEventListener("pageshow", (event) => {
  window.top.document.getElementById("navbar-urlbar").value = "";
});

document.getElementById("searchbox").addEventListener("keydown", (event) => {
  if(event.keyCode == 13) {
    window.top.document.querySelector(`webview.tab-webview[data-uuid="${window.top.selectedTab}"]`).src = `https://www.google.com/search?q=${event.target.value}`;
    event.target.blur();
  }
});

initBookmarks();
initRecents();
setInterval(() => {
  initBookmarks();
  initRecents();
}, 5000);

function initBookmarks() {
  document.getElementById("bookmarks").innerHTML = "";
  for(let i = 0; i < 6; i++) {
    var bookmark = document.createElement("a");
    bookmark.addEventListener("click", (event) => {
      window.top.document.querySelector(`webview.tab-webview[data-uuid="${window.top.selectedTab}"]`).src = window.top.bookmarkList[i].url;
    });
    bookmark.classList.add("bookmark");

    var icon = document.createElement("img");
    icon.src = `http://www.google.com/s2/favicons?sz=48&domain=${window.top.bookmarkList[i].url}`;
    bookmark.appendChild(icon);

    var label = document.createElement("p");
    label.innerText = window.top.bookmarkList[i].title;
    bookmark.appendChild(label);

    document.getElementById("bookmarks").appendChild(bookmark);
  }
}

function initRecents() {
  document.getElementById("recents-holder").innerHTML = "";
  for(let i = 0; i < 4; i++) {
    var recentCard = document.createElement("a");
    recentCard.addEventListener("click", (event) => {
      window.top.document.querySelector(`webview.tab-webview[data-uuid="${window.top.selectedTab}"]`).src = window.top.historyList[(window.top.historyList.length - i) - 1].url;
    });
    recentCard.classList.add("recentCard");

    var icon = document.createElement("img");
    icon.src = `http://www.google.com/s2/favicons?sz=48&domain=${window.top.historyList[(window.top.historyList.length - i) - 1].url}`;
    recentCard.appendChild(icon);

    var label = document.createElement("p");
    label.innerText = window.top.historyList[(window.top.historyList.length - i) - 1].title;
    recentCard.appendChild(label);

    var lastOpen = document.createElement("span");
    lastOpen.innerText = new Date(window.top.historyList[(window.top.historyList.length - i) - 1].lastOpen).toString().split(" GMT")[0].replace(" 0", " ").replace(" 0", " ").replace(" 0", " ").replace(" 0", " ");
    recentCard.appendChild(lastOpen);

    document.getElementById("recents-holder").appendChild(recentCard);
  }
}
