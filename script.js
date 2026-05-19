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
    title: 'Irrigation Reservoir Control System',
    tags: ['Proteus', 'STM32', 'Embedded C'],
    photos: [
      { src: 'images/irrigation_pcb_top.png', alt: 'Irrigation controller PCB layout' },
      { src: 'images/irrigation_pcb_schematic.png', alt: 'Irrigation controller PCB schematic' },
      { src: 'images/timer_board.jpg', alt: 'Irrigation control system timer PCB' },
    ],
    overview: `Developed a prototype embedded control system for an irrigation system model. This included reservoir level sensing, variable pump control, and valve actuation. Designed a custom PCB integrating all components of the breadboard prototype.`,
    highlights: [
      'Level sensing with ultrasonic sensor over UART',
      'Water control valve modelled using a servo motor',
      'PWM controlled motor representing pump operation',
      'Included a custom timer board to track and display simulated system time',
      'Designed firmware on an STM32 Nucleo microcontroller to control entire system, simulating complete operation over a 24h period',
      'Designed a custom PCB in Proteus that integrates all of the prototype functionality in a compact package',
    ],
  },
  '003': {
    num: '// 003',
    title: 'Appliance Energy Monitor',
    tags: ['Embedded C', 'STM32'],
    overview: `Designed and built a prototype embedded system to measure power usage of household appliances. STM32 Nucleo board interfaces with a voltage sensor and LCD screen to measure appliance voltage levels and display results.`,
    highlights: [
      'Embedded C firmware for microcontroller',
      'LCD driver integration and display formatting',
      'Voltage measurement circuit design',
      'Validation of working prototype across a range of voltages',
    ],
  },
  '004': {
    num: '// 004',
    title: 'Solar Car Dashboard PCB Design',
    tags: ['Altium'],
    photos: [
      { src: 'images/dashboard_schematic.png', alt: 'Dashboard PCB schematic' },
    ],
    overview: `Designed dashboard switch PCB schematic for Midnight Sun MSXV solar car using Altium Designer.`,
    highlights: [
      'Schematic design in Altium Designer',
      'Collaborated with a multidisciplinary engineering team to ensure dashboard design meshed with overall design plan',
    ],
  },
  '005': {
    num: '// 005',
    title: 'FIRST Robotics 2019 & 2020',
    tags: ['Fabrication', 'Electrical Assembly', 'Mechanical Design'],
    photos: [
      { src: 'images/2019_team_robot.jpg', alt: '2019 team & robot' },
    ],
    overview: `Played an integral role as part of a very small 4 person robotics team in high school. Contributed to the design and fabrication of two FIRST Robotics challenge robots in 2019 and 2020. Worked across both mechanical and electrical domains, building a strong foundation in systems integration and real-time control.`,
    highlights: [
      'Mechanical design and fabrication of robot chassis and mechanisms',
      'Electrical wiring and assembly',
      'Integration of sensors and actuators with control system',
      'Made it to semi-finals in regional competition in 2019',
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
