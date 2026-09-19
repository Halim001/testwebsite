/**
 * Main Interactive Logic - Rachel How Inspired Portfolio
 * Handles photo gallery carousel, interactive sunset generator, project filters, and copy actions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initGalleryCarousel();
  initSunsetStudio();
  initProjectFilters();
  initClipboardActions();
});

/* -------------------------------------------------------------------------- */
/* 1. Photo Gallery Carousel                                                  */
/* -------------------------------------------------------------------------- */
function initGalleryCarousel() {
  const track = document.querySelector('.gallery-track');
  const slides = document.querySelectorAll('.gallery-slide');
  const dots = document.querySelectorAll('.gallery-dot');
  const prevBtn = document.querySelector('.gallery-prev-btn');
  const nextBtn = document.querySelector('.gallery-next-btn');
  
  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;

  function goToSlide(index) {
    currentIndex = (index + totalSlides) % totalSlides;
    track.style.transform = `translate3d(-${currentIndex * 100}%, 0, 0)`;

    // Update dots
    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add('is-active');
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.classList.remove('is-active');
        dot.removeAttribute('aria-current');
      }
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
  }

  // Keyboard navigation within gallery
  const galleryContainer = document.querySelector('.gallery-container');
  if (galleryContainer) {
    galleryContainer.setAttribute('tabindex', '0');
    galleryContainer.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
      if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 2. Interactive Sunset Studio                                               */
/* -------------------------------------------------------------------------- */
function initSunsetStudio() {
  const canvas = document.getElementById('sunsetCanvas');
  const warmthSlider = document.getElementById('warmthSlider');
  const altitudeSlider = document.getElementById('altitudeSlider');
  const angleSlider = document.getElementById('angleSlider');
  const copyCssBtn = document.getElementById('copySunsetCss');
  const presetBtns = document.querySelectorAll('.preset-btn');

  if (!canvas || !warmthSlider || !altitudeSlider || !angleSlider) return;

  const presets = {
    golden: { warmth: 80, altitude: 45, angle: 135 },
    dusk: { warmth: 35, altitude: 20, angle: 160 },
    dawn: { warmth: 60, altitude: 75, angle: 90 },
    tokyo: { warmth: 15, altitude: 10, angle: 210 }
  };

  function updateSunset() {
    const warmth = parseInt(warmthSlider.value, 10);
    const altitude = parseInt(altitudeSlider.value, 10);
    const angle = parseInt(angleSlider.value, 10);

    // Dynamic color calculations
    // Color 1: Sky top
    const hueTop = Math.round(200 - (warmth * 1.5) + (altitude * 0.4));
    const satTop = Math.min(95, Math.round(65 + warmth * 0.2));
    const lightTop = Math.min(85, Math.round(50 + altitude * 0.3));

    // Color 2: Horizon glow
    const hueHorizon = Math.round(15 + (100 - warmth) * 0.8);
    const satHorizon = 95;
    const lightHorizon = Math.min(85, Math.round(55 + altitude * 0.25));

    // Color 3: Sun orb / highlight
    const hueSun = Math.round(40 + (altitude * 0.2));
    const satSun = 100;
    const lightSun = Math.min(90, Math.round(65 + (warmth * 0.2)));

    // Color 4: Deep base / water / land
    const hueBase = Math.round(220 - (warmth * 0.5));
    const satBase = Math.round(50 + warmth * 0.3);
    const lightBase = Math.max(25, Math.round(40 - altitude * 0.15));

    const gradient = `linear-gradient(${angle}deg, hsl(${hueTop}, ${satTop}%, ${lightTop}%) 0%, hsl(${hueHorizon}, ${satHorizon}%, ${lightHorizon}%) 38%, hsl(${hueSun}, ${satSun}%, ${lightSun}%) 68%, hsl(${hueBase}, ${satBase}%, ${lightBase}%) 100%)`;

    canvas.style.background = gradient;
    canvas.dataset.currentGradient = gradient;
  }

  warmthSlider.addEventListener('input', updateSunset);
  altitudeSlider.addEventListener('input', updateSunset);
  angleSlider.addEventListener('input', updateSunset);

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const presetKey = btn.dataset.preset;
      if (presets[presetKey]) {
        warmthSlider.value = presets[presetKey].warmth;
        altitudeSlider.value = presets[presetKey].altitude;
        angleSlider.value = presets[presetKey].angle;
        updateSunset();
      }
    });
  });

  if (copyCssBtn) {
    copyCssBtn.addEventListener('click', () => {
      const grad = canvas.dataset.currentGradient || canvas.style.background;
      const cssString = `background: ${grad};`;
      navigator.clipboard.writeText(cssString).then(() => {
        showToast('Sunset CSS gradient copied to clipboard! 🌅');
      });
    });
  }

  // Initial render
  updateSunset();
}

/* -------------------------------------------------------------------------- */
/* 3. Project Filtering                                                       */
/* -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.case-study-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filterCategory = btn.dataset.filter;

      projectCards.forEach(card => {
        const cardCategory = card.dataset.category;
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 4. Clipboard / Toast Alerts                                                */
/* -------------------------------------------------------------------------- */
function initClipboardActions() {
  const copyButtons = document.querySelectorAll('[data-copy-email]');
  const toast = document.getElementById('toastNotice');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-copy-email') || 'maya.lin.design@studio.io';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Copied ${email} to clipboard! ◡̈`);
      }).catch(() => {
        showToast(`Contact: ${email}`);
      });
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('is-visible');

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 2800);
}
