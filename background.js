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
                const POST_ID = 2;
                const PAGE_ID = 4;
                return `${pathList[POST_ID]}_x${pathList[PAGE_ID]}.jpg`;
            }
            case "fantia.jp": {
                const POST_ID = 1;
                const PAGE_ID = 3;
                return `${pathList[POST_ID]}_f${pathList[PAGE_ID]}.jpg`;
            }
            default:
                return "";
        }
    }
}