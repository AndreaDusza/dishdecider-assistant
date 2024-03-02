document.querySelector('#go-to-options').addEventListener('click', function() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('../settings/options.html'));
  }
});

document.querySelector('#go-to-manual').addEventListener('click', function() {
    window.open("https://github.com/AndreaDusza/dishdecider-assistant/blob/master/README.md");
});