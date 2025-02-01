export function file2url(file) {
    "use strict";
    if (!file) {
        return new Error("Argument is not defined.");
    }
    const filename = file.name.split("_");
    const postId = filename[0];
    const domainInitial = filename[1].charAt(0);
    switch (domainInitial) {
        case "x":
            return `https://x.com/_/status/${postId}`;
        case "f":
            return `https://fantia.jp/posts/${postId}`;
        case "p":
            return `https://www.pixiv.net/artworks/${postId}`;
        default:
            return new Error("Unsupported domain.");
    }
}

export function url2file(url) {
    "use strict";
    if (!url) {
        return new Error("Argument is not defined.");
    }
    const hostname = new URL(url).hostname;
    const pathname = new URL(url).pathname;
    const pathList = pathname.split("/").filter(segment => segment);
    switch (hostname) {
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
            return new Error("Unsupported hostname.");
    }
}

