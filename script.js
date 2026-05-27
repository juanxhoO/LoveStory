const memories = document.querySelectorAll('.memory');
const modal = document.querySelector('.modal');
const modalText = document.getElementById('modalText');
const closeBtn = document.querySelector('.close');

const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');

const introScreen = document.getElementById('introScreen');
const timeline = document.querySelector('.timeline');


// MUSIC + START

musicBtn?.addEventListener('click', async () => {
  try {
    await bgMusic.play();
  } catch (err) {
    console.log('Playback prevented:', err);
  }

  introScreen?.classList.add('hidden');
  timeline?.classList.add('visible');
});


// MEMORIES

memories.forEach(memory => {
  memory.addEventListener('click', () => {
    const text = memory.dataset.text;

    modalText.innerText = text;

    modal.classList.remove('hidden');
  });
});


// CLOSE MODAL

closeBtn?.addEventListener('click', () => {
  modal.classList.add('hidden');
});


// CLOSE ON BACKDROP

modal?.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});


// CANVAS STARFIELD

const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];

function initStars() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight / 2;
  stars = [];
  // Generate 200 stars
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5,
      alpha: Math.random(),
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      speedY: Math.random() * 0.3 + 0.1
    });
  }
}

function animateStars() {
  ctx.clearRect(0, 0, width, height);

  stars.forEach(star => {
    // Twinkle effect
    star.alpha += star.twinkleSpeed;
    if (star.alpha >= 1 || star.alpha <= 0.1) {
      star.twinkleSpeed *= -1; // reverse fading
    }

    // Drift slowly upwards
    star.y -= star.speedY;
    if (star.y < 0) {
      star.y = height;
      star.x = Math.random() * width;
    }

    // Draw the star
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, star.alpha)})`;
    ctx.fill();
  });

  requestAnimationFrame(animateStars);
}

window.addEventListener('resize', initStars);
initStars();
animateStars();