// ─── DOT GRID ───────────────────────────────────────────────
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

// ─── SCROLL REVEAL ──────────────────────────────────────────
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
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-left-color 0.3s';
  observer.observe(el);
});

// ─── PROJECT DATA ────────────────────────────────────────────
// To add photos later, add entries to a card's `photos` array:
//   { src: 'images/my-photo.jpg', alt: 'Description' }
// To add placeholder slots before you have photos, use:
//   { placeholder: 'Photo coming soon' }

const projects = {
  '001': {
    num: '// 001',
    title: 'MCU Debugger PCB',
    tags: ['KiCAD', 'STM32', 'Hardware', 'PCB Design'],
    photos: [
      { src: 'images/debug_schematic.png', alt: 'Debugger KiCAD PCB schematic' },
      { src: 'images/debug_top.jpg', alt: 'Assembled PCB top' },
      { src: 'images/debug_bottom.jpg', alt: 'Assembled PCB bottom' },
      { src: 'images/debug_powered.jpg', alt: 'Powered & working PCB' },
    ],
    overview: `Designed a custom interface board for the STM32-V3MODS debugger. The PCB was designed to mount directly on and provide power to an STM32-based CPU board. The board was designed from scratch in KiCAD, fabricated externally, and hand-assembled in-house.`,
    highlights: [
      'Schematic capture and PCB layout in KiCAD',
      'Component sourcing and BOM management',
      'Hand soldering and PCB assembly',
      'Hardware bring-up, testing, and validation',
    ],
  },
  '002': {
    num: '// 002',
    title: 'BLDC FOC Controller',
    tags: ['FreeRTOS', 'C', 'Motor Control', 'Embedded Firmware'],
    photos: [
      { placeholder: 'Motor controller setup photo' },
    ],
    overview: `Spent 6 weeks troubleshooting and tuning a sensorless Field-Oriented Control (FOC) motor controller for a BLDC motor. The challenge: achieving stable, controllable torque at very low speeds — a notoriously difficult operating regime for sensorless FOC.`,
    highlights: [
      'Diagnosed instability issues in sensorless back-EMF estimation at low speed',
      'Iteratively tuned PI current loop and observer parameters',
      'Wrote application firmware using POSIX-like functions in FreeRTOS',
      'Successfully achieved stable low-speed, high-startup-torque operation',
      'Documented tuning methodology and parameter rationale for the team',
    ],
  },
  '003': {
    num: '// 003',
    title: 'Power Usage Meter',
    tags: ['Embedded C', 'PCB', 'Hardware', 'Microcontroller'],
    photos: [
      { placeholder: 'Finished prototype photo' },
      { placeholder: 'PCB close-up' },
    ],
    overview: `Group project covering the complete embedded development cycle — from initial schematic design through PCB fabrication, firmware development, and final testing. The device measures and displays power usage on an LCD screen.`,
    highlights: [
      'Schematic design and PCB layout',
      'Embedded C firmware for microcontroller',
      'LCD driver integration and display formatting',
      'Power measurement circuit design and calibration',
      'End-to-end validation from schematic to working prototype',
    ],
  },
  '004': {
    num: '// 004',
    title: 'Solar Car PCB Design',
    tags: ['Altium', 'PCB Design', 'Automotive', 'Schematic Capture'],
    photos: [
      { placeholder: 'Schematic screenshot' },
      { placeholder: 'Solar car photo' },
    ],
    overview: `Designed PCB schematics using Altium Designer for the Midnight Sun Single Occupant Long Distance Solar Car team. Contributed to the electrical systems of a competition-grade vehicle built to race across long distances on solar power alone.`,
    highlights: [
      'Schematic design in Altium Designer',
      'Worked within the constraints of a competition-grade automotive electrical system',
      'Collaborated with a multidisciplinary student engineering team',
    ],
  },
  '005': {
    num: '// 005',
    title: 'FIRST Robotics 2019 & 2020',
    tags: ['Mechanical Design', 'Electrical', 'Robotics', 'Systems Integration'],
    photos: [
      { placeholder: '2019 robot photo' },
      { placeholder: '2020 robot photo' },
    ],
    overview: `Contributed to the design and fabrication of competitive FIRST Robotics challenge robots in 2019 and 2020 as part of a high school robotics team. Worked across both mechanical and electrical domains, building a strong foundation in systems integration and real-time control.`,
    highlights: [
      'Mechanical design and fabrication of robot chassis and mechanisms',
      'Electrical wiring, power distribution, and motor control',
      'Integration of sensors and actuators with the control system',
      'Competed in regional FIRST Robotics Competition events',
    ],
  },
};

// ─── MODAL LOGIC ─────────────────────────────────────────────
const overlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');
const closeBtn = document.getElementById('modal-close');

function buildModalHTML(data) {
  const tagsHTML = data.tags
    .map(t => `<span class="project-tag">${t}</span>`)
    .join('');

  const photosHTML = data.photos && data.photos.length
    ? `<div class="modal-photos">
        ${data.photos.map(p => {
          if (p.src) {
            return `<div class="modal-photo"><img src="${p.src}" alt="${p.alt || ''}"></div>`;
          }
          return `<div class="modal-photo"><p class="modal-photo-placeholder">${p.placeholder || 'Photo coming soon'}</p></div>`;
        }).join('')}
      </div>`
    : '';

  const highlightsHTML = data.highlights && data.highlights.length
    ? `<p class="modal-section-title">Highlights</p>
       <ul class="modal-highlights">
         ${data.highlights.map(h => `<li>${h}</li>`).join('')}
       </ul>`
    : '';

  return `
    <p class="modal-num">${data.num}</p>
    <h2 class="modal-title">${data.title}</h2>
    <div class="modal-tags">${tagsHTML}</div>
    ${photosHTML}
    <p class="modal-section-title">Overview</p>
    <div class="modal-body"><p>${data.overview}</p></div>
    ${highlightsHTML}
  `;
}

function openModal(projectId) {
  const data = projects[projectId];
  if (!data) return;
  modalContent.innerHTML = buildModalHTML(data);
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.project-card[data-project]').forEach(card => {
  card.addEventListener('click', () => openModal(card.dataset.project));
});

closeBtn.addEventListener('click', closeModal);

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
