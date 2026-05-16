// Animated dot grid
const grid = document.getElementById('heroGrid');
const COLS = 6, ROWS = 8;
const dots = [];
for (let i = 0; i < COLS * ROWS; i++) {
  const s = document.createElement('span');
  grid.appendChild(s);
  dots.push(s);
}
function lightDots() {
  dots.forEach(d => d.classList.remove('lit'));
  const count = 4 + Math.floor(Math.random() * 5);
  for (let i = 0; i < count; i++) {
    dots[Math.floor(Math.random() * dots.length)].classList.add('lit');
  }
}
lightDots();
setInterval(lightDots, 1200);

// Scroll-reveal for cards
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .stat-box').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s';
  observer.observe(el);
});
