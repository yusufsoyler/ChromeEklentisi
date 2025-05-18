function createButton(text, onClick) {
    const button = document.createElement('button');
    button.innerHTML = text;
    button.style.cssText = `
        background: rgba(0, 0, 0, 0.6);
        color: white;
        border: none;
        border-radius: 4px;
        padding: 8px 12px;
        margin: 0 5px;
        cursor: pointer;
        font-size: 14px;
        transition: background 0.2s;
        z-index: 2000;
    `;
    button.addEventListener('mouseover', () => {
        button.style.background = 'rgba(0, 0, 0, 0.8)';
    });
    button.addEventListener('mouseout', () => {
        button.style.background = 'rgba(0, 0, 0, 0.6)';
    });
    button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
    });
    return button;
}

function waitForElement(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

async function init() {
    try {
        // Video elementini bekle
        const video = await waitForElement('video');
        
        // Video oynatıcısını bekle
        const player = await waitForElement('.html5-video-player');
        
        if (!video || !player) return;

        // Varsa eski butonları temizle
        const existingContainer = document.querySelector('.custom-video-controls');
        if (existingContainer) {
            existingContainer.remove();
        }

        // Butonları içerecek konteyner
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'custom-video-controls';
        buttonContainer.style.cssText = `
            position: absolute;
            left: 50%;
            bottom: 55px;
            transform: translateX(-50%);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            pointer-events: auto;
        `;

        // Geri sarma butonu
        const backwardButton = createButton('◀ 10s', () => {
            if (video.currentTime) {
                video.currentTime = Math.max(0, video.currentTime - 10);
            }
        });

        // İleri sarma butonu
        const forwardButton = createButton('10s ▶', () => {
            if (video.currentTime && video.duration) {
                video.currentTime = Math.min(video.duration, video.currentTime + 10);
            }
        });

        // Butonları konteynere ekle
        buttonContainer.appendChild(backwardButton);
        buttonContainer.appendChild(forwardButton);

        // Konteyneri video oynatıcısına ekle
        player.appendChild(buttonContainer);
    } catch (error) {
        console.error('YouTube Controller Error:', error);
    }
}

// Sayfa yüklendiğinde başlat
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Sayfa değişimlerini dinle
window.addEventListener('yt-navigate-finish', init);
window.addEventListener('spfdone', init); // Eski YouTube navigasyonu için
window.addEventListener('yt-navigate-start', init); 