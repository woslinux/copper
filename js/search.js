document.getElementById("urlbar").addEventListener("focus", (event) => {
  var i = document.getElementById("context-menu");
  var j = document.getElementById("tab-views");
  var k = document.querySelector(`webview.tab-webview[tab-id="${selectedTab}"]`);
  document.addEventListener("pointerup", (event) => {
    if(i.classList.contains("shown")) {
      i.classList.remove("shown");
      j.classList.remove("disabled");
    }
  });
  i.classList.toggle("shown");
  j.classList.toggle("disabled");
  i.innerHTML = "";
  i.style.left = `180px`;
  i.style.right = null;
  i.style.top = null;
  i.style.width = `calc(100% - 360px)`;
  i.style.height = null;
  document.getElementById("urlbar").addEventListener("keypress", (event) => {
    getQueryGoogle(event.target.value, function(data) {
      var results = data.query.results.json.json[1].json;
      i.innerHTML = "";
      results.forEach((result) => {
        var rs = document.createElement("button");
        rs.innerText = result;
        rs.addEventListener("click", (event) => {
          k.src = `https://www.google.com/search?q=${event.target.value}`;
        });
        i.appendChild(rs);
    });
  });
});
function addScript(u) { 
  var s = document.createElement("script"); 
  s.src = u;  
  document.getElementsByTagName("*")[1].appendChild(s);
}
function getQueryWiki(term, callback) {    
  var id = `i${Math.random().toString(36).slice(2)}`;
  getQueryWiki[id] = function(data) {
     callback(data);
     delete getQueryWiki[id];
  };
  addScript("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22http%3A%2F%2Fen.wikipedia.org%2Fw%2Fapi.php%3Faction%3Dopensearch%26search%3D"
    + encodeURIComponent(term)
    + "%26namespace%3D0%22%20&format=json&callback=getQueryWiki." + id);
}
function getQueryGoogle(term, callback) {
  var id = `i${Math.random().toString(36).slice(2)}`;
  getQueryGoogle[id] = function(data) {
     callback(data);
     delete getQueryGoogle[id];
  };
  addScript("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22http%3A%2F%2Fsuggestqueries.google.com%2Fcomplete%2Fsearch%3Fclient%3Dfirefox%26q%3D"
    + encodeURIComponent(term)
    + "%22%20&format=json&callback=getQueryGoogle." + id);
}
