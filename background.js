import * as exchangeModule from "./exchangeModule.js";

chrome.runtime.onInstalled.addListener(() => {
    "use strict";
    chrome.contextMenus.create({
        id: "saveRevasableImage",
        title: "復元可能な名前を付けて保存",
        contexts: ["image"]
    });
});

chrome.contextMenus.onClicked.addListener(info => {
    "use strict";
    if (info.menuItemId === "saveRevasableImage") {
        const filename = exchangeModule.url2file(info.pageUrl);
        if (filename instanceof Error) {
            console.error(filename.message);
            return;
        }
        chrome.downloads.download({
            url: info.srcUrl,
            filename: filename
        });
    }
});