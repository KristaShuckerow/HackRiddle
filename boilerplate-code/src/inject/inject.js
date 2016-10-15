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
            var regex = /(<([^>]+)>)/ig;
            bodyClone = bodyClone.replace(regex, " ");
            console.log(bodyClone);
	    }
	}, 10);
});
