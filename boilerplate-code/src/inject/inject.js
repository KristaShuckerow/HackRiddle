chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	    if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            var body = document.body;
            var tmp = document.createElement("div");
            var bodyClone = body.cloneNode(true);
            tmp.appendChild(bodyClone);
            bodyClone = tmp.innerHTML;
            //html stripping regex
            var scriptRegex = /(<script[^>]*>[^>]+<\/script>)/ig;
            var regex = /(<([^>]+)>)/ig;
            bodyClone = bodyClone.replace(scriptRegex, " ");
            bodyClone = bodyClone.replace(regex, " ");
            console.log(bodyClone);
            httpPost('http://localhost:8000/', bodyClone);
	    }
	}, 10);
});

function httpPost(theUrl, text){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", theUrl, false); // false for synchronous request
    xmlHttp.send({body: text});
    return xmlHttp.responseText;
}
