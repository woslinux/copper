(function() {
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
    }, 100);
  };
  document.onreadystatechange = () => {
    if(document.readyState == "complete") {
      init();
    }
  };
})();
