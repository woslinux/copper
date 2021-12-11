(function() {
  const { exec } = require("child_process");
  const { ipcRenderer } = require("electron");

  function setupWindow() {
    document.getElementById("mainWindow-minimize").addEventListener("click", (event) => {
      ipcRenderer.invoke("minimize");
    });

    document.getElementById("mainWindow-maximize").addEventListener("click", (event) => {
      ipcRenderer.invoke("maximize");
      document.getElementById("main-window").classList.toggle("maximized");
    });

    document.getElementById("mainWindow-close").addEventListener("click", (event) => {
      if(document.querySelectorAll(`button.tab[data-uuid]`).length <= 1) {
        window.close();
      } else if(document.querySelectorAll(`button.tab[data-uuid]`).length >= 1) {
        confirm("exit-title", "exit-detail", () => window.close());
      }
    });

    if(process.platform = "linux") {
      exec("gsettings get org.gnome.desktop.interface gtk-theme", (error, stdout, stderr) => {
        if(error) {
          console.log(error);
        }
        if(stderr) {
          console.log(stderr);
        }
        var appHolder = document.getElementById("main-window");
        const output = /*stdout.toString().replace("'", "").replace("'", "")*/ "Breeze";
        appHolder.style.setProperty("--icon-gtk-close", `url("file:///usr/share/themes/${output}/assets/titlebutton-close.png")`);
        appHolder.style.setProperty("--icon-gtk-close-hover", `url("file:///usr/share/themes/${output}/assets/titlebutton-close-hover.png")`);
        appHolder.style.setProperty("--icon-gtk-close-active", `url("file:///usr/share/themes/${output}/assets/titlebutton-close-active.png")`);
        appHolder.style.setProperty("--icon-gtk-maximize", `url("file:///usr/share/themes/${output}/assets/titlebutton-maximize.png")`);
        appHolder.style.setProperty("--icon-gtk-maximize-hover", `url("file:///usr/share/themes/${output}/assets/titlebutton-maximize-hover.png")`);
        appHolder.style.setProperty("--icon-gtk-maximize-active", `url("file:///usr/share/themes/${output}/assets/titlebutton-maximize-active.png")`);
        appHolder.style.setProperty("--icon-gtk-minimize", `url("file:///usr/share/themes/${output}/assets/titlebutton-minimize.png")`);
        appHolder.style.setProperty("--icon-gtk-minimize-hover", `url("file:///usr/share/themes/${output}/assets/titlebutton-minimize-hover.png")`);
        appHolder.style.setProperty("--icon-gtk-minimize-active", `url("file:///usr/share/themes/${output}/assets/titlebutton-minimize-active.png")`);
        appHolder.style.setProperty("--icon-gtk-restore", `url("file:///usr/share/themes/${output}/assets/titlebutton-maximize-maximized.png")`);
        appHolder.style.setProperty("--icon-gtk-restore-hover", `url("file:///usr/share/themes/${output}/assets/titlebutton-maximize-maximized-hover.png")`);
        appHolder.style.setProperty("--icon-gtk-restore-active", `url("file:///usr/share/themes/${output}/assets/titlebutton-maximize-maximized-active.png")`);
//         appHolder.style.setProperty("--icon-gtk-close", `url("file:///home/${process.env.USER}/.themes/${output}/assets/titlebutton-close.png")`);
//         appHolder.style.setProperty("--icon-gtk-close-hover", `url("file:///home/${process.env.USER}/.themes/${output}/assets/titlebutton-close-hover.png")`);
//         appHolder.style.setProperty("--icon-gtk-close-active", `url("file:///home/${process.env.USER}/.themes/${output}/assets/titlebutton-close-active.png")`);
//         appHolder.style.setProperty("--icon-gtk-maximize", `url("file:///home/${process.env.USER}/.themes/${output}/assets/titlebutton-maximize.png")`);
//         appHolder.style.setProperty("--icon-gtk-maximize-hover", `url("file:///home/${process.env.USER}/.themes/${output}/assets/titlebutton-maximize-hover.png")`);
//         appHolder.style.setProperty("--icon-gtk-maximize-active", `url("file:///home/${process.env.USER}/.themes/${output}/assets/titlebutton-maximize-active.png")`);
//         appHolder.style.setProperty("--icon-gtk-minimize", `url("file:///home/${process.env.USER}/.themes/${output}/assets/titlebutton-minimize.png")`);
//         appHolder.style.setProperty("--icon-gtk-minimize-hover", `url("file:///home/${process.env.USER}/.themes/${output}/assets/titlebutton-minimize-hover.png")`);
//         appHolder.style.setProperty("--icon-gtk-minimize-active", `url("file:///home/${process.env.USER}/.themes/${output}/assets/titlebutton-minimize-active.png")`);
//         appHolder.style.setProperty("--icon-gtk-restore", `url("file:///home/${process.env.USER}/.themes/${output}/assets/titlebutton-maximize-maximized.png")`);
//         appHolder.style.setProperty("--icon-gtk-restore-hover", `url("file:///home/${process.env.USER}/.themes/${output}/assets/titlebutton-maximize-maximized-hover.png")`);
//         appHolder.style.setProperty("--icon-gtk-restore-active", `url("file:///home/${process.env.USER}/.themes/${output}/assets/titlebutton-maximize-maximized-active.png")`);
      });

      exec("gsettings get org.gnome.desktop.interface icon-theme", (error, stdout, stderr) => {
        if(error) {
          console.log(error);
        }
        if(stderr) {
          console.log(stderr);
        }
        var appHolder = document.getElementById("main-window");
        const output = stdout.toString().replace("\'", "").replace("\'", "");
        appHolder.style.setProperty("--icon-gtk-close", `url("file:///usr/share/icons/${output}/scalable/ui/window-close-symbolic.svg")`);
        appHolder.style.setProperty("--icon-gtk-maximize", `url("file:///usr/share/icons/${output}/scalable/ui/window-maximize-symbolic.svg")`);
        appHolder.style.setProperty("--icon-gtk-minimize", `url("file:///usr/share/icons/${output}/scalable/ui/window-minimize-symbolic.svg")`);
        appHolder.style.setProperty("--icon-gtk-restore", `url("file:///usr/share/icons/${output}/scalable/ui/window-restore-symbolic.svg")`);
        appHolder.style.setProperty("--icon-gtk-close", `url("file:///home/${process.env.USER}/.icons/${output}/scalable/ui/window-close-symbolic.svg")`);
        appHolder.style.setProperty("--icon-gtk-maximize", `url("file:///home/${process.env.USER}/.icons/${output}/scalable/ui/window-maximize-symbolic.svg")`);
        appHolder.style.setProperty("--icon-gtk-minimize", `url("file:///home/${process.env.USER}/.icons/${output}/scalable/ui/window-minimize-symbolic.svg")`);
        appHolder.style.setProperty("--icon-gtk-restore", `url("file:///home/${process.env.USER}/.icons/${output}/scalable/ui/window-restore-symbolic.svg")`);
      });
    }

    setInterval(() => {
      ipcRenderer.on("blur", () => {
        document.getElementById("main-window").classList.add("unfocused");
      });
      ipcRenderer.on("focus", () => {
        document.getElementById("main-window").classList.remove("unfocused");
      });

      if(document.getElementById("main-window").classList.contains("gpu-capable")) {
        if(process.platform == "linux") {
          exec("gsettings get org.gnome.desktop.background picture-uri", (error, stdout, stderr) => {
            if(error) {
              console.log(error);
            }
            if(stderr) {
              console.log(stderr);
            }
            document.getElementById("main-window").style.backgroundImage = `url(${stdout})`;
          });
        } else if(process.platform == "win32") {
          
        } else if(process.platform == "mac") {
          
        }
        document.getElementById("main-window").style.backgroundPosition = `-${window.screenX}px -${window.screenY}px`;
        document.getElementById("main-window").style.backgroundSize = `${window.screenHeight}px ${window.screenWidth}px`;
      } else {
        document.getElementById("main-window").style.backgroundImage = null;
        document.getElementById("main-window").style.backgroundPosition = null;
        document.getElementById("main-window").style.backgroundSize = null;
      }
    }, 100);
  };

  document.onreadystatechange = () => {
    if(document.readyState == "complete") {
      setupWindow();
    }
  };
})();
