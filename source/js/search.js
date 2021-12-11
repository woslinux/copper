document.getElementById("navbar-urlbar").addEventListener("focus", (event) => {
  var k = document.querySelector(`webview.tab-webview[data-uuid="${selectedTab}"]`);

  document.getElementById("navbar-urlbar-holder").classList.add("focused");
});

document.getElementById("navbar-urlbar").addEventListener("blur", (event) => {
  document.getElementById("navbar-urlbar-holder").classList.remove("focused");
});

// function addScript(u) { 
//   var s = document.createElement("script"); 
//   s.src = u;  
//   document.getElementsByTagName("*")[1].appendChild(s);
// }
// 
// function getQueryWiki(term, callback) {    
//   var id = `i${Math.random().toString(36).slice(2)}`;
//   getQueryWiki[id] = function(data) {
//      callback(data);
//      delete getQueryWiki[id];
//   };
//   addScript("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22http%3A%2F%2Fen.wikipedia.org%2Fw%2Fapi.php%3Faction%3Dopensearch%26search%3D"
//     + encodeURIComponent(term)
//     + "%26namespace%3D0%22%20&format=json&callback=getQueryWiki." + id);
// }
// 
// function getQueryGoogle(term, callback) {
//   var id = `i${Math.random().toString(36).slice(2)}`;
//   getQueryGoogle[id] = function(data) {
//      callback(data);
//      delete getQueryGoogle[id];
//   };
//   addScript("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22http%3A%2F%2Fsuggestqueries.google.com%2Fcomplete%2Fsearch%3Fclient%3Dfirefox%26q%3D"
//     + encodeURIComponent(term)
//     + "%22%20&format=json&callback=getQueryGoogle." + id);
// }
