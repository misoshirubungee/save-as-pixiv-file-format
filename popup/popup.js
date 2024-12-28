"use strict";
const dragElement = document.getElementById('dragarea');
if (dragElement) {
  dragElement.addEventListener('dragover', event => {
    event.preventDefault();
  });
  dragElement.addEventListener('drop', event => {
    event.preventDefault();
    for (const file of event.dataTransfer.files) {
      console.log(file);
      const url = new UrlCreator(file);
      chrome.tabs.create({ url: url.createUrl() }, tab => {
        console.log(tab);
      });
    }
  });
}

class UrlCreator {
  constructor(file) {
    this.filename = file.name.split("_");
    this.postId = this.filename[0];
    this.domeinInitial = this.filename[1].charAt(0);
  }

  createUrl() {
    switch (this.domeinInitial) {
      case "x":
        // x.comはユーザ名は不要であるため、postIdのみで指定する。
        return `https://x.com/_/status/${this.postId}`;
      case "f":
        return `https://fantia.jp/posts/${this.postId}`;
      case "p":
        return `https://www.pixiv.net/artworks/${this.postId}`;
      default:
        return "";
    }
  }
}