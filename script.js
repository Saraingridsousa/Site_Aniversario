const btn = document.getElementById("surpriseBtn");
const msg = document.getElementById("message");
const video = document.getElementById("video-bg");
const toggleBtn = document.getElementById("audioToggle");
const audioIcon = document.getElementById("audioIcon");
const videoPlaceholder = document.getElementById("video-placeholder");


function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.textContent = "❤️";
  heart.style.position = "fixed";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "0";
  heart.style.fontSize = "2rem";
  heart.style.animation = "rise 5s ease-in forwards";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}

function startHearts() {
  setInterval(createHeart, 400);
}


function positionAudioButton() {
  const isMobile = window.innerWidth < 768;
  const header = document.getElementById("header");
  const surpriseBtn = document.getElementById("surpriseBtn");
  const headerRect = header.getBoundingClientRect();
  const surpriseBtnRect = surpriseBtn.getBoundingClientRect();

  if (isMobile) {
    if (headerRect.bottom > 0) {
      toggleBtn.style.top = 'auto';
      toggleBtn.style.bottom = '1rem';
      toggleBtn.style.right = '1rem';
      toggleBtn.style.left = 'auto';
    } else {
      const maxTop = Math.max(surpriseBtnRect.top - 60, 16);
      toggleBtn.style.top = Math.min(16, maxTop) + 'px';
      toggleBtn.style.bottom = 'auto';
      toggleBtn.style.right = '1rem';
      toggleBtn.style.left = 'auto';
    }
  } else {
    toggleBtn.style.top = 'auto';
    toggleBtn.style.bottom = '1rem';
    toggleBtn.style.right = '1rem';
    toggleBtn.style.left = 'auto';
  }
}


btn.addEventListener("click", () => {
  msg.classList.remove("hidden");
  startHearts();
});

video.muted = true;

video.addEventListener('loadeddata', () => {
  video.style.opacity = '1';
  videoPlaceholder.style.opacity = '0';
  setTimeout(() => {
    videoPlaceholder.style.display = 'none';
  }, 1000);
});

setTimeout(() => {
  if (video.readyState < 2) {
    videoPlaceholder.style.opacity = '0';
    setTimeout(() => {
      videoPlaceholder.style.display = 'none';
    }, 1000);
  }
}, 5000);

toggleBtn.addEventListener("click", () => {
  video.muted = !video.muted;
  audioIcon.textContent = video.muted ? "🔇" : "🔊";
});

positionAudioButton();
window.addEventListener('resize', positionAudioButton);
window.addEventListener('scroll', positionAudioButton);

// Efeito de "zoom" suave nas imagens visíveis em dispositivos pequenos
function scaleCardsOnScroll() {
  if (window.innerWidth > 640) return; // Só em telas pequenas

  document.querySelectorAll('.card-foto').forEach(card => {
    const rect = card.getBoundingClientRect();
    const cardMiddle = rect.top + rect.height / 2;
    const windowMiddle = window.innerHeight / 2;
    const distance = Math.abs(cardMiddle - windowMiddle);

    // Quanto mais perto do centro, maior o scale (máx 1.07, min 1)
    let scale = 1 + Math.max(0, 0.07 - distance / window.innerHeight * 0.14);
    card.style.transform = `scale(${scale})`;
    card.style.transition = 'transform 0.3s cubic-bezier(.4,2,.6,1)';
    card.style.zIndex = scale > 1.01 ? 20 : 1;
  });
}

window.addEventListener('scroll', scaleCardsOnScroll);
window.addEventListener('resize', scaleCardsOnScroll);
scaleCardsOnScroll();

// Flip card ao dar duplo clique (desktop) ou toque duplo (mobile)
document.querySelectorAll('.flip-card-inner').forEach(card => {
  let lastTap = 0;
  card.addEventListener('dblclick', function (e) {
    e.currentTarget.classList.toggle('flipped');
  });
  card.addEventListener('touchend', function (e) {
    const now = new Date().getTime();
    if (now - lastTap < 400) {
      e.currentTarget.classList.toggle('flipped');
      e.preventDefault();
    }
    lastTap = now;
  });
});