"use strict";
var Browser = {
  open: (href = homeURL, selected = true, _private = false) => {
    const { session } = require("electron");
    const fs = require("fs");
    const path = require("path");
    const uuid = require("uuid");

    var i = document.getElementById("tabsToolbar-tabs");
    var j = document.createElement("button");
  
    j.classList.add("tab");
    j.draggable = true;
    j.style.order = document.querySelectorAll(`button.tab[data-uuid]`).length;
    j.setAttribute("data-uuid", uuid.v4());
    j.addEventListener("pointerdown", (event) => {
      Browser.focus(j.getAttribute("data-uuid"));
    });
    j.addEventListener("dragstart", (event) => {
      j.style.opacity = 0.5;
      event.dataTransfer.setData("text", event.target.getAttribute("data-uuid"));
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
      document.querySelectorAll(`button.tab[data-uuid]`).forEach((element) => {
        if(!element.classList.contains("selected")) {
          element.classList.remove("drag");
        }
      });
    });
    j.addEventListener("drop", (event) => {
      event.preventDefault();
      var data = document.querySelector(`button.tab[data-uuid="${event.dataTransfer.getData("text")}"]`);
      localStorage.setItem("lastTabOrder", j.style.order);
      j.style.order = data.style.order;
      data.style.order = localStorage.getItem("lastTabOrder");
    });
    var k = document.createElement("img");
    k.classList.add("tab-favicon");
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
        Browser.focus(j.previousElementSibling.getAttribute("data-uuid"));
      } else {
        if(j.nextElementSibling) {
          Browser.focus(j.nextElementSibling.getAttribute("data-uuid")).click();
        } else {
          Browser.focus(document.querySelectorAll("button.tab[data-uuid]")[0].getAttribute("data-uuid"));
        }
      }
      setTimeout(() => {
        if(document.querySelectorAll("button.tab[data-uuid]").length == 0) {
          window.close();
        }
      }, 1);
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
    var k1 = document.getElementById("webviews");
    var l1 = document.createElement("webview");
    l1.classList.add("tab-webview");
    l1.setAttribute("data-about", "false");
    l1.setAttribute("data-home", "false");
    l1.setAttribute("data-settings", "false");
    l1.setAttribute("data-error", "false");
    l1.src = href;
    l1.setAttribute("data-uuid", j.getAttribute("data-uuid"));
    l1.addEventListener("did-start-loading", (event) => {
      k.src = "images/loading.png";
      if(j.getAttribute("data-uuid") == selectedTab) {
        document.getElementById("navbar-reload").classList.add("stop");
      }
    });
    l1.addEventListener("did-fail-load", (event) => {
      if(j.getAttribute("data-uuid") == selectedTab) {
        document.getElementById("webview-about-about").style.display = "none";
        document.getElementById("webview-about-home").style.display = "none";
        document.getElementById("webview-about-settings").style.display = "none";
        document.getElementById("webview-about-error").style.display = "block";
        l1.setAttribute("data-error", "true");
        document.getElementById("navbar-urlbar").value = l1.getURL();
      }
    });
    l1.addEventListener("did-stop-loading", (event) => {
      if(k.src !== "images/loading.png") {
        k.src = "images/file_16.png";
      }
      if(j.getAttribute("data-uuid") == selectedTab) {
        document.getElementById("navbar-reload").classList.remove("stop");
        if(l1.getURL().startsWith("file://")) {
          document.getElementById("navbar-security").classList.add("file");
          document.getElementById("navbar-security").classList.remove("https");
        } else if(l1.getURL().startsWith("https://")) {
          document.getElementById("navbar-security").classList.remove("file");
          document.getElementById("navbar-security").classList.add("https");
        } else {
          document.getElementById("navbar-security").classList.remove("file");
          document.getElementById("navbar-security").classList.remove("https");
        }
        if(l1.getURL().startsWith("about:blank#")) {
          document.getElementById("webview-about-about").style.display = "none";
          l1.setAttribute("data-about", "false");
          document.getElementById("webview-about-home").style.display = "none";
          l1.setAttribute("data-home", "false");
          document.getElementById("webview-about-settings").style.display = "none";
          l1.setAttribute("data-settings", "false");
          document.getElementById("webview-about-error").style.display = "none";
          l1.setAttribute("data-error", "false");
          document.getElementById(`webview-about-${l1.getURL().split("#")[1]}`).style.display = "block";
          l1.setAttribute(`data-${l1.getURL().split("#")[1]}`, "true");
        } else {
          document.getElementById("webview-about-about").style.display = "none";
          document.getElementById("webview-about-home").style.display = "none";
          document.getElementById("webview-about-settings").style.display = "none";
          document.getElementById("webview-about-error").style.display = "none";
        }
        document.getElementById("navbar-urlbar").value = l1.getURL();
      }
      if(!l1.getURL().startsWith("about:blank#")) {
        historyList.push({
          title: l1.getTitle(),
          url: l1.getURL(),
          lastOpen: Date.now()
        });
      }
      localStorage.setItem("historyList", JSON.stringify(historyList));
    });
    l1.addEventListener("dom-ready", (event) => {
      if(j.getAttribute("data-uuid") == selectedTab) {
        document.getElementById("navbar-reload").classList.add("stop");
        if(l1.getURL().startsWith("about:blank#")) {
          document.getElementById("webview-about-about").style.display = "none";
          l1.setAttribute("data-about", "false");
          document.getElementById("webview-about-home").style.display = "none";
          l1.setAttribute("data-home", "false");
          document.getElementById("webview-about-settings").style.display = "none";
          l1.setAttribute("data-settings", "false");
          document.getElementById("webview-about-error").style.display = "none";
          l1.setAttribute("data-error", "false");
          document.getElementById(`webview-about-${l1.getURL().split("#")[1]}`).style.display = "block";
          l1.setAttribute(`data-${l1.getURL().split("#")[1]}`, "true");
        } else {
          document.getElementById("webview-about-about").style.display = "none";
          document.getElementById("webview-about-home").style.display = "none";
          document.getElementById("webview-about-settings").style.display = "none";
          document.getElementById("webview-about-error").style.display = "none";
        }
        document.getElementById("navbar-reload").classList.remove("stop");
        if(l1.getURL().startsWith("file://")) {
          document.getElementById("navbar-security").classList.add("file");
          document.getElementById("navbar-security").classList.remove("https");
        } else if(l1.getURL().startsWith("https://")) {
          document.getElementById("navbar-security").classList.remove("file");
          document.getElementById("navbar-security").classList.add("https");
        } else {
          document.getElementById("navbar-security").classList.remove("file");
          document.getElementById("navbar-security").classList.remove("https");
        }
        if(l1.canGoBack()) {
          document.getElementById("navbar-back").disabled = false;
        } else {
          document.getElementById("navbar-back").disabled = true;
        }
        if(l1.canGoForward()) {
          document.getElementById("navbar-forward").disabled = false;
        } else {
          document.getElementById("navbar-forward").disabled = true;
        }
        document.getElementById("navbar-urlbar").value = l1.getURL();
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
        if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
          l1.insertCSS(`
            :focus-visible {
              outline: 1px solid #00c0ff;
            }
            ::-webkit-scrollbar {
              background-color: rgba(0, 0, 0, 0.125);
              display: block;
              width: 16px;
              height: 16px;
            }
            ::-webkit-scrollbar-button:single-button {
              background: rgba(0, 0, 0, 0) center no-repeat;
              background-size: 12px;
              border-radius: 0;
              display: block;
              image-rendering: pixelated;
              height: 16px;
              width: 16px;
            }
            ::-webkit-scrollbar-button:single-button:hover {
              background-color: rgba(255, 255, 255, 0.125);
            }
            ::-webkit-scrollbar-button:single-button:active {
              background-color: rgba(255, 255, 255, 0.25);
            }
            ::-webkit-scrollbar-button:single-button:decrement {
              background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iOTYiIGhlaWdodD0iOTYiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTg1LjkyMzAyLDQxLjIwODMzYy0xLjM5ODcyLDAuMDIwNDUgLTIuNzM0MzcsMC41ODUzNCAtMy43MjMzMSwxLjU3NDcxbC02OS44NzUsNjkuODc1Yy0xLjQwNDEyLDEuMzQ4MTUgLTEuOTY5NzIsMy4zNTAwNSAtMS40Nzg2Nyw1LjIzMzY0YzAuNDkxMDUsMS44ODM2IDEuOTYyMDIsMy4zNTQ1NyAzLjg0NTYxLDMuODQ1NjJjMS44ODM2LDAuNDkxMDUgMy44ODU0OSwtMC4wNzQ1NSA1LjIzMzY0LC0xLjQ3ODY3bDY2LjA3NDcxLC02Ni4wNzQ3MWw2Ni4wNzQ3MSw2Ni4wNzQ3MWMxLjM0ODE1LDEuNDA0MTIgMy4zNTAwNSwxLjk2OTcxIDUuMjMzNjQsMS40Nzg2NmMxLjg4MzU5LC0wLjQ5MTA1IDMuMzU0NTYsLTEuOTYyMDIgMy44NDU2MSwtMy44NDU2MWMwLjQ5MTA1LC0xLjg4MzU5IC0wLjA3NDU1LC0zLjg4NTQ5IC0xLjQ3ODY2LC01LjIzMzY0bC02OS44NzUsLTY5Ljg3NWMtMS4wMjY2NiwtMS4wMjcwOCAtMi40MjUyLC0xLjU5NTA4IC0zLjg3NzI4LC0xLjU3NDcxeiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+Cg==");
            }
            ::-webkit-scrollbar-button:single-button:increment {
              background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iOTYiIGhlaWdodD0iOTYiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6I2ZmZmZmZjsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTE1NS44MjYwMSw0Mi45MjMwMmMtMS40MTk1LDAuMDMzNTIgLTIuNzY4MDgsMC42MjczIC0zLjc1MTMsMS42NTE2OWwtNjYuMDc0NzEsNjYuMDc0NzFsLTY2LjA3NDcxLC02Ni4wNzQ3MWMtMS4wMTIyMiwtMS4wNDI0IC0yLjQwMzMsLTEuNjMwNjQgLTMuODU2MjgsLTEuNjMwN2MtMi4xODgxNCwwLjAwMDUzIC00LjE1NzYsMS4zMjczNSAtNC45ODAwNiwzLjM1NTA0Yy0wLjgyMjQ1LDIuMDI3NjkgLTAuMzMzNzUsNC4zNTE1NiAxLjIzNTc1LDUuODc2MjRsNjkuODc1LDY5Ljg3NWMyLjA5OTEsMi4wOTgyMyA1LjUwMTQ5LDIuMDk4MjMgNy42MDA1OSwwbDY5Ljg3NSwtNjkuODc1YzEuNTk5ODEsLTEuNTM1NDkgMi4wOTI1OSwtMy44OTU3NSAxLjI0MDgzLC01Ljk0MzA5Yy0wLjg1MTc3LC0yLjA0NzM0IC0yLjg3MzI4LC0zLjM2MTU2IC01LjA5MDExLC0zLjMwOTE5eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+Cg==");
            }
            ::-webkit-scrollbar-button:single-button:horizontal {
              transform: rotate(-90deg);
            }
            ::-webkit-scrollbar-corner {
              background-color: rgba(0, 0, 0, 0.125);
            }
            ::-webkit-scrollbar-thumb {
              background-clip: content-box;
              background-color: #808080;
              border: none;
              border-radius: 0;
              width: 64px;
              height: 64px;
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
              background-color: rgba(0, 0, 0, 0.125);
              display: block;
              width: 16px;
              height: 16px;
            }
            ::-webkit-scrollbar-button:single-button {
              background: rgba(0, 0, 0, 0) center no-repeat;
              background-size: 16px;
              border-radius: 0;
              display: block;
              image-rendering: pixelated;
              height: 16px;
              width: 16px;
            }
            ::-webkit-scrollbar-button:single-button:hover {
              background-color: rgba(0, 0, 0, 0.125);
            }
            ::-webkit-scrollbar-button:single-button:active {
              background-color: rgba(0, 0, 0, 0.25);
            }
            ::-webkit-scrollbar-button:single-button:decrement {
              background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iOTYiIGhlaWdodD0iOTYiCnZpZXdCb3g9IjAgMCA0OCA0OCIKc3R5bGU9IiBmaWxsOiMwMDAwMDA7Ij48cGF0aCBkPSJNIDIzLjk3ODUxNiAxMS41IEEgMS41MDAxNSAxLjUwMDE1IDAgMCAwIDIyLjkzOTQ1MyAxMS45Mzk0NTMgTCAzLjQzOTQ1MzEgMzEuNDM5NDUzIEEgMS41MDAxNSAxLjUwMDE1IDAgMSAwIDUuNTYwNTQ2OSAzMy41NjA1NDcgTCAyNCAxNS4xMjEwOTQgTCA0Mi40Mzk0NTMgMzMuNTYwNTQ3IEEgMS41MDAxNSAxLjUwMDE1IDAgMSAwIDQ0LjU2MDU0NyAzMS40Mzk0NTMgTCAyNS4wNjA1NDcgMTEuOTM5NDUzIEEgMS41MDAxNSAxLjUwMDE1IDAgMCAwIDIzLjk3ODUxNiAxMS41IHoiPjwvcGF0aD48L3N2Zz4K");
            }
            ::-webkit-scrollbar-button:single-button:increment {
              background-image: url("PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iOTYiIGhlaWdodD0iOTYiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTE1NS44MjYwMSw0Mi45MjMwMmMtMS40MTk1LDAuMDMzNTIgLTIuNzY4MDgsMC42MjczIC0zLjc1MTMsMS42NTE2OWwtNjYuMDc0NzEsNjYuMDc0NzFsLTY2LjA3NDcxLC02Ni4wNzQ3MWMtMS4wMTIyMiwtMS4wNDI0IC0yLjQwMzMsLTEuNjMwNjQgLTMuODU2MjgsLTEuNjMwN2MtMi4xODgxNCwwLjAwMDUzIC00LjE1NzYsMS4zMjczNSAtNC45ODAwNiwzLjM1NTA0Yy0wLjgyMjQ1LDIuMDI3NjkgLTAuMzMzNzUsNC4zNTE1NiAxLjIzNTc1LDUuODc2MjRsNjkuODc1LDY5Ljg3NWMyLjA5OTEsMi4wOTgyMyA1LjUwMTQ5LDIuMDk4MjMgNy42MDA1OSwwbDY5Ljg3NSwtNjkuODc1YzEuNTk5ODEsLTEuNTM1NDkgMi4wOTI1OSwtMy44OTU3NSAxLjI0MDgzLC01Ljk0MzA5Yy0wLjg1MTc3LC0yLjA0NzM0IC0yLjg3MzI4LC0zLjM2MTU2IC01LjA5MDExLC0zLjMwOTE5eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+Cg==");
            }
            ::-webkit-scrollbar-button:single-button:horizontal {
              transform: rotate(-90deg);
            }
            ::-webkit-scrollbar-corner {
              background-color: rgba(255, 255, 255, 0.125);
            }
            ::-webkit-scrollbar-thumb {
              background-clip: content-box;
              background-color: #808080;
              border: none;
              border-radius: 0;
              width: 64px;
              height: 64px;
            }
            ::-webkit-scrollbar-thumb:hover {
              background-color: #707070;
            }
            ::-webkit-scrollbar-thumb:active {
              background-color: #808080;
            }
            ::-webkit-scrollbar-track {
              background-color: transparent;
            }
          `);
        }
      }
      l1.insertCSS(`
        a, html, p {
          font-size: ${parseInt(fontSize)}px;
        }
        a[href]:after {
          background-color: #ffffff;
          border: 1px solid #c0c0c0;
          box-sizing: 2px 2px 2px 0 #000000;
          color: #000000;
          content: attr(href);
          font-family: system-ui;
          font-size: 14px;
          font-weight: normal;
          opacity: 0;
          overflow: hidden;
          padding: 2px;
          pointer-events: none;
          text-overflow: ellipsis;
          transition: 125ms linear;
          visibility: hidden;
          white-space: nowrap;
          z-index: 9999999999999999;
          position: fixed;
          left: 0;
          bottom: 0;
          max-width: 512px;
        }
        a[href]:hover:after {
          opacity: 1;
          visibility: visible;
        }
        a[href]:hover:after:hover {
          opacity: 0;
          visibility: hidden;
        }
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
        small {
          font-size: ${parseInt(fontSize * 0.5)}px;
        }
        [dir="rtl"] a[href]:after {
          left: auto;
          right: 0;
        }
        @media (prefers-color-scheme: dark) {
          a[href]:after {
            background-color: #303030;
            border-color: #606060;
            color: #ffffff;
          }
        }
      `);
    });
    l1.addEventListener("page-favicon-updated", (event) => {
      if(event.favicons[0] !== "") {
        k.src = event.favicons[0];
      } else {
        k.src = "images/file_16.png";
      }
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
      openContextMenu([
        /* {
          type: "button",
          label: "back",
          role: "back",
        },
        {
          type: "button",
          label: "forward",
          role: "forward",
        },
        {
          type: "button",
          label: "reload",
          role: "reload",
        },
        {
          type: "hr"
        }, */
        {
          type: "button",
          label: "copy",
          role: "copy",
          keybind: "Ctrl+C"
        },
        {
          type: "button",
          label: "cut",
          role: "cut",
          keybind: "Ctrl+X"
        },
        {
          type: "button",
          label: "paste",
          role: "paste",
          keybind: "Ctrl+V"
        },
        {
          type: "hr"
        },
        {
          type: "button",
          label: "selectAll",
          role: "selectall",
          keybind: "Ctrl+A"
        },
        {
          type: "hr"
        },
        {
          type: "button",
          label: "undo",
          role: "undo",
          keybind: "Ctrl+Z"
        },
        {
          type: "button",
          label: "redo",
          role: "redo",
          keybind: "Ctrl+U"
        },
        {
          type: "hr"
        },
        {
          type: "button",
          label: "inspectElement",
          role: "inspect"
        }
      ], event.params.x, event.params.y);
    });
    l1.addEventListener("enter-html-full-screen", (event) => {
      document.getElementById("main-window").style.filter = "brightness(0)";
      setTimeout(() => {
        document.getElementById("main-window").style.filter = null;
      }, 1000);
    });
    l1.addEventListener("leave-html-full-screen", (event) => {
      document.getElementById("main-window").style.filter = "brightness(0)";
      setTimeout(() => {
        document.getElementById("main-window").style.filter = null;
      }, 1000);
    });
    l1.addEventListener("new-window", async (event) => {
      Browser.newTab(event.url);
    });
    k1.appendChild(l1);
    if(selected) {
      setTimeout(() => {
        Browser.focus(j.getAttribute("data-uuid"));
      }, 10);
    }
    var j2 = document.getElementById("tabsToolbar-tooltip");
    var childrenInfo = [
      document.getElementById("tabsToolbar-tooltip-favicon"),
      document.getElementById("tabsToolbar-tooltip-title"),
      document.getElementById("tabsToolbar-tooltip-url"),
      document.getElementById("tabsToolbar-tooltip-hr"),
      document.getElementById("tabsToolbar-tooltip-audio"),
      document.getElementById("tabsToolbar-tooltip-peak")
    ];
    childrenInfo[1].style.width = "calc(100% - 24px)";
    childrenInfo.forEach((element) => {
      j2.appendChild(element);
    });
    j.addEventListener("pointerenter", (event) => {
      childrenInfo[0].src = k.src;
      childrenInfo[1].innerText = l.innerText;
      childrenInfo[2].innerText = l1.getURL();
      childrenInfo[2].style.opacity = 0.5;
      childrenInfo[2].style.overflow = "hidden";
      childrenInfo[2].style.textOverflow = "ellipsis";
      j2.style.left = `${j.offsetLeft - 16}px`;
      setTimeout(() => {
        if(j2.offsetLeft <= 0) {
          j2.style.left = "0";
        } else if(j2.offsetLeft >= (window.innerWidth - j2.getBoundingClientRect().width - 2)) {
          j2.style.left = `${window.innerWidth - j2.getBoundingClientRect().width - 2}px`;
        }
      }, 250);
      j2.style.top = `${j.offsetTop + j.getBoundingClientRect().height + 20}px`;
      childrenInfo[2].style.width = "100%";
      j2.classList.add("shown");
      if(l1.isCurrentlyAudible()) {
        childrenInfo[3].style.display = "block";
        childrenInfo[4].style.display = "block";
      } else {
        childrenInfo[3].style.display = "none";
        childrenInfo[4].style.display = "none";
      }
      l1.capturePage({}).then((image) => {
        if(selectedTab == j.getAttribute("data-uuid")) {
          childrenInfo[5].src = image.toDataURL();
          j.setAttribute("data-thumbnail", image.toDataURL().toString());
        } else {
          childrenInfo[5].src = j.getAttribute("data-thumbnail");
        }
      })
    });
    j.addEventListener("pointerleave", (event) => {
      j2.classList.remove("shown");
    });
    i.appendChild(j);
    document.getElementById("navbar-back").addEventListener("pointerup", (event) => {
      event.preventDefault();
      if(selectedTab == j.getAttribute("data-uuid")) {
        l1.goBack();
      }
    });
    document.getElementById("navbar-forward").addEventListener("pointerup", (event) => {
      event.preventDefault();
      if(selectedTab == j.getAttribute("data-uuid")) {
        l1.goForward();
      }
    });
    document.getElementById("navbar-reload").addEventListener("pointerup", (event) => {
      event.preventDefault();
      if(selectedTab == j.getAttribute("data-uuid")) {
        if(l1.isLoading()) {
          l1.stop();
        } else {
          l1.reload();
        }
      }
    });
    document.getElementById("navbar-home").addEventListener("pointerup", (event) => {
      if(selectedTab == j.getAttribute("data-uuid")) {
        l1.src = homeURL;
      }
    });
    var bellSound;
    const { exec } = require("child_process");
    exec("gsettings get org.gnome.desktop.sound theme-name", (error, stdout, stderr) => {
      if(error) {
        console.log(error);
      }
      if(stderr) {
        console.log(stderr);
      }
      bellSound = new Audio(`/usr/share/sounds/${stdout.replace("'", "").replace("'", "")}/stereo/bell.oga`);
    });
    document.getElementById("navbar-urlbar").addEventListener("keydown", (event) => {
      if(event.keyCode == 13) {
        if(selectedTab == j.getAttribute("data-uuid")) {
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
            event.target.blur();
          } else {
            if(event.target.value.includes(".")
              && !event.target.value.includes("//")
              && !event.target.value.includes(":")
              && !event.target.value.includes(" ")
              && !event.target.value.startsWith("about:blank#")) {
              l1.src = `https://${event.target.value}`;
            } else if((event.target.value.includes(".")
              && event.target.value.includes("//")
              || event.target.value.includes(":"))
              && !event.target.value.includes(" ")
              && !event.target.value.startsWith("about:blank#")) {
              l1.src = event.target.value;
            } else if(event.target.value.startsWith("about:blank#")) {
              l1.src = event.target.value;
              if(l1.getURL().startsWith("about:blank#")) {
                document.getElementById("webview-about-about").style.display = "none";
                l1.setAttribute("data-about", "false");
                document.getElementById("webview-about-home").style.display = "none";
                l1.setAttribute("data-home", "false");
                document.getElementById("webview-about-settings").style.display = "none";
                l1.setAttribute("data-settings", "false");
                document.getElementById("webview-about-error").style.display = "none";
                l1.setAttribute("data-error", "false");
                document.getElementById(`webview-about-${l1.getURL().split("#")[1]}`).style.display = "block";
                l1.setAttribute(`data-${l1.getURL().split("#")[1]}`, "true");
                console.log(l1.getURL().split("#")[1]);
              } else {
                document.getElementById("webview-about-about").style.display = "none";
                document.getElementById("webview-about-home").style.display = "none";
                document.getElementById("webview-about-settings").style.display = "none";
                document.getElementById("webview-about-error").style.display = "none";
              }
              event.target.blur();
            } else if(event.target.value == "") {
              bellSound.play();
            } else {
              l1.src = `https://www.google.com/search?q=${event.target.value}`;
              event.target.blur();
            }
          }
        }
      }
    });
    window.addEventListener("keyup", (event) => {
      event.preventDefault();
      if(event.keyCode == 122) {
        if(document.fullscreen) {
          document.exitFullscreen();
          document.getElementById("main-window").classList.remove("fullscreen");
        } else {
          document.body.requestFullscreen();
          document.getElementById("main-window").classList.add("fullscreen");
        }
      }
      if(event.keyCode == 122) {
        if(document.fullscreen) {
          document.exitFullscreen();
          document.getElementById("main-window").classList.remove("fullscreen");
        } else {
          document.body.requestFullscreen();
          document.getElementById("main-window").classList.add("fullscreen");
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
    fs.readdir(path.join(`${__dirname}/extensions`), (error, files) => {
      if(error) {
        console.log(error);
      } else {
        files.forEach((file) => {
          var manifest = JSON.parse(fs.readFileSync(`${__dirname}/extensions/${file}/manifest.json`));
          manifest.content_scripts.forEach((item) => {
            item.matches.forEach((item) => {
              if(l1.getURL() == item.replace(/[*]/g, /[A-Za-z0-9.*+?^${}()|[\]\\]/)) {
                manifest.content_scripts.js.forEach((item) => {
                  var script = fs.readFileSync(`${__dirname}/extensions/${file}/${item}`);
                  l1.executeJavaScript(script);
                });
              }
            });
          });
          session.loadExtension(`${__dirname}/extensions/${file}`).then(({ id }) => {
            // [ ... ]
          });
        });
      }
    });
  },
  focus: (uuid) => {
    var i = document.querySelector(`button.tab[data-uuid="${uuid}"]`);
    var j = document.querySelector(`webview.tab-webview[data-uuid="${uuid}"]`);
    var deselect = document.querySelectorAll("button.tab[data-uuid], webview.tab-webview[data-uuid]");
    deselect.forEach((element) => {
      element.classList.remove("selected");
    });
    i.classList.add("selected");
    j.classList.add("selected");
    selectedTab = uuid;
    if(j.canGoBack()) {
      document.getElementById("navbar-back").disabled = false;
    } else {
      document.getElementById("navbar-back").disabled = true;
    }
    if(j.canGoForward()) {
      document.getElementById("navbar-forward").disabled = false;
    } else {
      document.getElementById("navbar-forward").disabled = true;
    }
    document.getElementById("navbar-urlbar").value = j.getURL();
    if(j.getURL().startsWith("file://")) {
      document.getElementById("navbar-security").classList.add("file");
      document.getElementById("navbar-security").classList.remove("https");
    } else if(j.getURL().startsWith("https://")) {
      document.getElementById("navbar-security").classList.remove("file");
      document.getElementById("navbar-security").classList.add("https");
    } else {
      document.getElementById("navbar-security").classList.remove("file");
      document.getElementById("navbar-security").classList.remove("https");
    }
    if(j.getURL().startsWith("about:blank#")) {
      document.getElementById("webview-about-about").style.display = "none";
      document.getElementById("webview-about-home").style.display = "none";
      document.getElementById("webview-about-settings").style.display = "none";
      document.getElementById("webview-about-error").style.display = "none";
      document.getElementById(`webview-about-${j.getURL().split("#")[1]}`).style.display = "block";
      j.setAttribute(`data-${j.getURL().split("#")[1]}`, "true");
    } else {
      document.getElementById("webview-about-about").style.display = "none";
      document.getElementById("webview-about-home").style.display = "none";
      document.getElementById("webview-about-settings").style.display = "none";
      document.getElementById("webview-about-error").style.display = "none";
      j.focus();
    }
  }
};
