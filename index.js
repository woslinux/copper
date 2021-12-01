"use strict";
const { app, autoUpdater, BrowserWindow, ipcMain, protocol } = require("electron");
const path = require("path");
require("update-electron-app")();
// const server = "https://wos-org.github.io/deployment";
// const href = `${server}/update/browser/${process.platform}/${app.getVersion()}`;
// autoUpdater.setFeedURL({ href });
// setInterval(() => {
  // autoUpdater.checkForUpdates();
// }, 60000);
// app.setPath("appData", `${__dirname}/profile/users/global`);
// app.setPath("home", `${__dirname}/profile/config`);
// app.setPath("userData", `${__dirname}/profile`);
// app.setPath("cache", `${__dirname}/profile/cache`);
// app.setPath("temp", `${__dirname}/profile/temp`);
// app.setPath("desktop", `${__dirname}/profile/users/global/desktop`);
// app.setPath("documents", `${__dirname}/profile/users/global/documents`);
// app.setPath("downloads", `${__dirname}/profile/users/global/downloads`);
// app.setPath("music", `${__dirname}/profile/users/global/music`);
// app.setPath("pictures", `${__dirname}/profile/users/global/pictures`);
// app.setPath("videos", `${__dirname}/profile/users/global/videos`);
// app.setPath("recent", `${__dirname}/profile/users/global/recent`);
// app.setPath("logs", `${__dirname}/profile/logs`);
// app.setPath("crashDumps", `${__dirname}/profile/crash-logs`);
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    minWidth: 900,
    minHeight: 600,
    frame: false,
    autoHideMenuBar: true,
    title: "Aluminum Browser",
    icon: "assets/favicon.png",
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      preload: path.join(__dirname, "src/preload.js"),
      defaultEncoding: "UTF-8",
      contextIsolation: false,
      webviewTag: true,
    },
    transparent: true
  });
  mainWindow.setMenu(null);
  mainWindow.webContents.loadFile("src/index.html");
  mainWindow.openDevTools();
  for(let index = 0; index < process.argv.length; index++) {
    if(process.argv[index].startsWith("file://")
      || process.argv[index].startsWith("http://")
      || process.argv[index].startsWith("https://")
    ) {
      mainWindow.loadURL(process.argv[index]);
    } else if(process.argv[index].startsWith("--href=")) {
      mainWindow.loadFile(process.argv[index]
        .replace("--href=", "")
      );
    }
  }
  ipcMain.handle("maximize", async (event) => {
    if(BrowserWindow.getFocusedWindow().isMaximized()) {
      BrowserWindow.getFocusedWindow().unmaximize();
    } else {
      BrowserWindow.getFocusedWindow().maximize();
    }
  });
  ipcMain.handle("minimize", async (event) => {
    BrowserWindow.getFocusedWindow().minimize();
  });
  ipcMain.handle("addons", async (event) => {
    const webIDEWindow = new BrowserWindow({
      width: 800,
      height: 600,
      minWidth: 800,
      minHeight: 600,
      frame: false,
      autoHideMenuBar: true,
      title: "Aluminum WebIDE",
      icon: "assets/webide.png",
      webPreferences: {
        devTools: true,
        nodeIntegration: true,
        nodeIntegrationInWorker: true,
        preload: path.join(__dirname, "src/preload.js"),
        defaultEncoding: "UTF-8",
        contextIsolation: false,
        webviewTag: true,
      },
      transparent: true
    });
    webIDEWindow.loadFile("webide/index.html");
    webIDEWindow.on("blur", () => {
      webIDEWindow.webContents.send("blur");
    });
    webIDEWindow.on("focus", () => {
      webIDEWindow.webContents.send("focus");
    });
  });
  mainWindow.on("blur", () => {
    mainWindow.webContents.send("blur");
  });
  mainWindow.on("focus", () => {
    mainWindow.webContents.send("focus");
  });
}
app.whenReady().then(() => {
  createWindow();
  app.on("activate", function() {
    if(BrowserWindow.getAllWindows().length === 0) createWindow();
  });
  protocol.registerFileProtocol("browser", (request, callback) => {
    const url = request.url.substr(7);
    callback({
      path: path.normalize(`${__dirname}/src/pages/${url}`)
    });
  });
});
app.on("window-all-closed", function() {
  if(process.platform !== "darwin") app.quit();
});
// autoUpdater.on("update-downloaded", (event, releaseNotes, releaseName) => {
//   const dialogOpts = {
//     type: "info",
//     buttons: [
//       "Restart",
//       "Ask me later"
//     ],
//     title: "Aluminum Browser Update!",
//     message: process.platform === "win32" ? releaseNotes : releaseName,
//     detail: "A new version of the browser has been downloaded. Restart the browser to apply the updates."
//   }
//   dialog.showMessageBox(dialogOpts).then((returnValue) => {
//     if (returnValue.response === 0) autoUpdater.quitAndInstall();
//   });
// });
// autoUpdater.on("error", message => {
//   console.error("There was a problem updating the browser.");
//   console.error(message);
// });
