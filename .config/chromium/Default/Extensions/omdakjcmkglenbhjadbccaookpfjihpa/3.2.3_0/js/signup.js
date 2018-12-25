window.onhashchange = function () {
  if (window.location.hash === "#/signed-up") {
      setTimeout(function() {
          var message = { toggled: true, country: 0 };
          if (navigator.userAgent.indexOf("Chrome") != -1) {
              chrome.runtime.sendMessage(message);
          } else {
              browser.runtime.sendMessage(message);
          }
      }, 6000);
  }
}