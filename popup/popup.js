import * as exchangeModule from "../exchangeModule.js";

const dragElement = document.getElementById('dragarea');
if (dragElement) {
  dragElement.addEventListener('dragover', event => {
    event.preventDefault();
  });
  dragElement.addEventListener('drop', event => {
    event.preventDefault();
    for (const file of event.dataTransfer.files) {
      const url = exchangeModule.file2url(file);
      chrome.tabs.create({ url: url });
    }
  });
}