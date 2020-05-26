//add button in the page
let btnElement = document.createElement("button");
let wrapper = document.querySelector(".List-headerOptions");
let writeArtical = document.querySelector(".Profile-writePosts");
if (wrapper.contains(writeArtical)) {
    wrapper.appendChild(btnElement);
    btnElement.id = "uDownload";
    btnElement.className = "uDownload";
    document.getElementById("uDownload").innerText = "下载全部文章";
}


//obtain userID
let message = document.getElementById("ProfileHeader").getAttribute("data-za-extra-module");
let token = JSON.parse(message).card.content.token;

function uDownloadAll() {
    chrome.runtime.sendMessage(
        { contentScriptQuery: 'fetchDownload', token: token },
        result => {
            result.data.forEach((article, index) => {
                // html to markdown
                var turndownService = new TurndownService();
                var markdown = turndownService.turndown(article.content);

                var link = document.createElement('a');
                //设置下载的文件名
                link.download = `article-${index}.md`;
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
