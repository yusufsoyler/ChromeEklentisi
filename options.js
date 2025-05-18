document.addEventListener('DOMContentLoaded', function() {
  // Mevcut kısayol tuşunu al
  chrome.commands.getAll(function(commands) {
    const clearCookiesCommand = commands.find(command => command.name === "clear-cookies");
    if (clearCookiesCommand) {
      document.getElementById('currentShortcut').textContent = clearCookiesCommand.shortcut || 'Atanmamış';
    }
  });
}); 