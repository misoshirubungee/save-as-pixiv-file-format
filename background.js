"use strict";
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "saveRevasableImage",
        title: "復元可能な名前を付けて保存",
        contexts: ["image"]
    });
});

chrome.contextMenus.onClicked.addListener(info => {
    if (info.menuItemId === "saveRevasableImage") {
        const urlModule = new UrlModule(info.pageUrl);
        const filename = urlModule.createFilename();
        if (filename === "") {
           throw new Error("未対応のドメインです。");
        }
        chrome.downloads.download({
            url: info.srcUrl,
            filename: filename
        });
    }
});

class UrlModule {
    constructor(url) {
        this.url = new URL(url);
        this.hostname = this.url.hostname;
        this.pathname = this.url.pathname;
    }

    createFilename() {
        const pathList = this.pathname.split("/").filter(segment => segment);
        switch(this.hostname) {
            case "x.com": {
                const postId = 2;
                const pageId = 4;
                return `${pathList[postId]}_x${pathList[pageId]}.jpg`;
            }
            case "fantia.jp": {
                const postId = 1;
                const pageId = 3;
                return `${pathList[postId]}_f${pathList[pageId]}.jpg`;
            }
            default:
                return "";
        }
    }
}