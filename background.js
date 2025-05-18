// Tuş kombinasyonunu dinle
chrome.commands.onCommand.addListener((command) => {
  if (command === "clear-cookies") {
    clearBrowsingData();
  }
});

// Çerezleri temizleme fonksiyonu
function clearBrowsingData() {
  chrome.browsingData.remove({
    "since": 0
  }, {
    "cookies": true,
    "localStorage": true
  }, () => {
    // Temizleme işlemi tamamlandığında bildirim gönder
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'images/icon128.png',
      title: 'Çerezler Temizlendi',
      message: 'Tüm çerezler başarıyla temizlendi!'
    });
  });
}

// Popup'tan gelen mesajları dinle
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "clearCookies") {
    clearBrowsingData();
    sendResponse({status: "success"});
  }
}); 