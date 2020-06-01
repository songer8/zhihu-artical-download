//add button in the page;
let btnElement = document.createElement("button");
let wrapper = document.querySelector(".List-headerOptions");
let writeArtical = document.querySelector(".Profile-writePosts");
if (wrapper.contains(writeArtical)) {
    btnElement.className = "uDownload";
    btnElement.innerText = "下载全部文章";
    wrapper.appendChild(btnElement);
}


//obtain userID;
let token = window.location.href.split("/")[4];
var articleApi = "https://www.zhihu.com/api/v4/members/" + token + "/articles?include=data[*].content&offset=0&limit=1000&sort_by=created";

function uDownloadAll() {
    chrome.runtime.sendMessage(
        { contentScriptQuery: 'fetchDownloadAll', articleApi: articleApi },
        result => {
            result.data.forEach((article, index) => {
                // html to markdown
                var turndownService = new TurndownService();
                var markdown = turndownService.turndown(article.content);

                var link = document.createElement('a');
                //设置下载的文件名
                var turndownFilename = new TurndownService();
                let filename = turndownFilename.turndown(article.title);
                link.download = `article-${filename}.md`;
                //设置下载内容
                link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(markdown);
                link.innerText = '下载';
                link.style.display = 'block';
                document.body.appendChild(link);
                link.click();
            });
        }
    );
}

btnElement.addEventListener("click", uDownloadAll);

let contentItems = document.querySelectorAll('.ContentItem.ArticleItem');
contentItems.forEach(function (contentItem, index) {
    //add buttom;
    let downloadBtn = document.createElement('button');
    downloadBtn.className = 'downloadItem';
    downloadBtn.innerHTML = '下载此文章';
    contentItem.appendChild(downloadBtn);

    //obtain single singleArticalUrl;
    let pageId = JSON.parse(contentItem.getAttribute('data-zop')).itemId;
    console.log(pageId);
    let singleArticalUrl = `https://zhuanlan.zhihu.com/api/articles/${pageId}`;


    function uDownloadSingle() {
        chrome.runtime.sendMessage(
            { contentScriptQuery: 'fetchDownload', singleArticalUrl: singleArticalUrl },
            function (result) {
                // html to markdown
                var turndownService = new TurndownService();
                var markdown = turndownService.turndown(result.content);

                var link = document.createElement('a');
                //设置下载的文件名
                var turndownFilename = new TurndownService();
                let filename = turndownFilename.turndown(result.title);
                link.download = `article-${filename}.md`;
                //设置下载内容
                link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(markdown);
                link.innerText = '下载';
                link.style.display = 'block';
                document.body.appendChild(link);
                link.click();
            }
        );
    }
    downloadBtn.addEventListener('click', uDownloadSingle);

});





