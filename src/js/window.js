(function() {
  const { exec } = require("child_process");
  const { ipcRenderer } = require("electron");
  function init() {
    document.getElementById("minimize").addEventListener("click", (event) => {
      ipcRenderer.invoke("minimize");
    });
    document.getElementById("maximize").addEventListener("click", (event) => {
      ipcRenderer.invoke("maximize");
      document.getElementById("app-holder").classList.toggle("maximized");
    });
    document.getElementById("close").addEventListener("click", (event) => {
      window.close();
    });
    setInterval(() => {
      ipcRenderer.on("blur", () => {
        document.getElementById("app-holder").classList.add("unfocused");
      });
      ipcRenderer.on("focus", () => {
        document.getElementById("app-holder").classList.remove("unfocused");
      });
      if(document.getElementById("app-holder").classList.contains("gpu-capable")) {
        if(process.platform == "linux") {
          exec("gsettings get org.gnome.desktop.background picture-uri", (error, stdout, stderr) => {
            if(error) {
              console.log(error);
            }
            if(stderr) {
              console.log(stderr);
            }
            document.getElementById("app-holder").style.backgroundImage = `url(${stdout})`;
          });
        } else if(process.platform == "win32") {
          
        } else if(process.platform == "mac") {
          
        }
        document.getElementById("app-holder").style.backgroundPosition = `-${window.screenX}px -${window.screenY}px`;
        document.getElementById("app-holder").style.backgroundSize = `${window.screenHeight}px ${window.screenWidth}px`;
      } else {
        document.getElementById("app-holder").style.backgroundImage = null;
        document.getElementById("app-holder").style.backgroundPosition = null;
        document.getElementById("app-holder").style.backgroundSize = null;
      }
    }, 100);
  };
  document.onreadystatechange = () => {
    if(document.readyState == "complete") {
      init();
    }
  };
})();
