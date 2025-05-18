document.addEventListener('DOMContentLoaded', function() {
  const clearButton = document.getElementById('clearButton');
  const settingsLink = document.getElementById('settingsLink');
  
  // Mevcut kısayol tuşunu göster
  chrome.commands.getAll(function(commands) {
    const clearCookiesCommand = commands.find(command => command.name === "clear-cookies");
    if (clearCookiesCommand) {
      document.getElementById('currentShortcut').textContent = clearCookiesCommand.shortcut || 'Atanmamış';
    }
  });

  // Temizleme butonu işlevi
  clearButton.addEventListener('click', function() {
    // Background script'e mesaj gönder
    chrome.runtime.sendMessage({action: "clearCookies"}, function(response) {
      if (response.status === "success") {
        // Başarılı temizleme sonrası butonu güncelle
        clearButton.textContent = "Temizlendi!";
        clearButton.style.backgroundColor = "#45a049";
        
        // 2 saniye sonra butonu eski haline getir
        setTimeout(() => {
          clearButton.textContent = "Çerezleri Temizle";
          clearButton.style.backgroundColor = "#4CAF50";
        }, 2000);
      }
    });
  });

  // Ayarlar bağlantısı işlevi
  settingsLink.addEventListener('click', function(e) {
    e.preventDefault();
    chrome.tabs.create({
      url: 'chrome://extensions/shortcuts'
    });
  });
}); 