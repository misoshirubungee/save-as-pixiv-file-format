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
        try {
            const filename = exchangeModule.url2file(info.srcUrl);
            chrome.downloads.download({
                url: info.srcUrl,
                filename: filename
            });
        } catch (error) {
            getCurrentTab().then(tab => {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: () => {
                        alert("このページは対応していません。");
                    }
                });
            });
            console.log(error);
        }
        
    }
});

const getCurrentTab = async () => {
    const queryOptions = { active: true, currentWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}