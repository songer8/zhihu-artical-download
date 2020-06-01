chrome.runtime.onMessage.addListener(
    function (request,sender, sendResponse) {
        if (request.contentScriptQuery == 'fetchDownloadAll') {
            var articleApi = request.articleApi;           
            fetch(articleApi)
                .then(response => response.json())
                .then(result => sendResponse(result));
            return true;
        }
    }
);


chrome.runtime.onMessage.addListener(
    function (request,sender, sendResponse) {
        if (request.contentScriptQuery == 'fetchDownload') {
            var singleArticleUrl = request.singleArticleUrl;
            fetch(singleArticleUrl)
                .then(function(response){
                    return response.json();
                })
                .then(function(result){
                    sendResponse(result);
                });
            return true;
        }
    }
);
