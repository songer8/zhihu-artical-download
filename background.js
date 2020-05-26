chrome.runtime.onMessage.addListener(
    function (request,sender, sendResponse) {
        if (request.contentScriptQuery == 'fetchDownload') {
            var token = request.token;
            var articleApi = "https://www.zhihu.com/api/v4/members/"+token+"/articles?include=data[*].content&offset=0&limit=1000&sort_by=created";
            fetch(articleApi)
                .then(response => response.json())
                .then(result => sendResponse(result));
            return true;
        }
    }
);
