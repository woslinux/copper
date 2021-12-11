window.addEventListener("load", (event) => {
  var i = document.getElementById("webview-about-about");
  i.src = "pages/about.html";
  i.style.display = "none";
  var j = document.getElementById("webview-about-home");
  j.src = "pages/home.html";
  j.style.display = "none";
  var k = document.getElementById("webview-about-settings");
  k.src = "pages/settings.html";
  k.style.display = "none";
  var l = document.getElementById("webview-about-error");
  l.src = "net_error.html";
  l.style.display = "none";
});
