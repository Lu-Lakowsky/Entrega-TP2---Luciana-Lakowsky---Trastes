/**
* Template Name: Append
* Template URL: https://bootstrapmade.com/append-bootstrap-website-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
const mobileNavToggleIcon = mobileNavToggleBtn.querySelector('i');

function mobileNavToogle() {
  document.querySelector('body').classList.toggle('mobile-nav-active');
  mobileNavToggleIcon.classList.toggle('bi-list');
  mobileNavToggleIcon.classList.toggle('bi-x');
}
mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

document.querySelectorAll('#navmenu a').forEach(navmenu => {
  navmenu.addEventListener('click', () => {
    if (document.querySelector('.mobile-nav-active')) {
      mobileNavToogle();
    }
  });
});


  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);



  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  // =========================
// INSTRUMENTOS SECTION
// Plays/pauses an audio file when a circular button is clicked.
// Only one sound plays at a time; clicking the active button pauses it.
// =========================


document.addEventListener('DOMContentLoaded', function () {
  var buttons = document.querySelectorAll('.instrumentos__play');
  var audioMap = new Map(); // button -> Audio instance
  var currentlyPlaying = null;

  function resetButton(btn) {
    btn.classList.remove('is-playing');
  }

  buttons.forEach(function (button) {
    var src = button.getAttribute('data-audio');
    var audio = new Audio(src);
    audioMap.set(button, audio);

    audio.addEventListener('ended', function () {
      resetButton(button);
      currentlyPlaying = null;
    });

    button.addEventListener('click', function () {
      // If this button's audio is already playing, pause it.
      if (button.classList.contains('is-playing')) {
        audio.pause();
        audio.currentTime = 0;
        resetButton(button);
        currentlyPlaying = null;
        return;
      }

      // Stop whatever else is playing first.
      if (currentlyPlaying && currentlyPlaying !== button) {
        var otherAudio = audioMap.get(currentlyPlaying);
        otherAudio.pause();
        otherAudio.currentTime = 0;
        resetButton(currentlyPlaying);
      }

      audio.currentTime = 0;
      audio.play().catch(function (err) {
        console.warn('No se pudo reproducir el audio:', err);
      });

      button.classList.add('is-playing');
      currentlyPlaying = button;
    });
  });
});

// =========================
// INSTRUMENTOS — calibración de imagen de fondo por columna
// Mide el offsetLeft real de cada columna y lo pasa como
// variable CSS al ::before, para que la imagen se vea correcta
// con cualquier proporción de columnas en el grid.
// =========================
function calibrarInstrumentos() {
  var section = document.querySelector('.instrumentos');
  var list = document.querySelector('.instrumentos__list');
  var items = document.querySelectorAll('.instrumentos__item');
  if (!section || !list || !items.length) return;

  var sectionWidth  = section.offsetWidth;
  var sectionHeight = section.offsetHeight;

  items.forEach(function (item) {
    // offsetLeft relativo a la sección (no al viewport)
    var offsetLeft = item.offsetLeft - section.offsetLeft;

    // background-size: el ancho exacto de la sección en px,
    // así la imagen se escala igual que con cover pero controlado.
    item.style.setProperty('--instr-bg-size', sectionWidth + 'px ' + sectionHeight + 'px');

    // background-position-x: desplazamos la imagen hacia la izquierda
    // tantos píxeles como el offsetLeft de esta columna.
    item.style.setProperty('--instr-bg-x', '-' + offsetLeft + 'px');
  });
}

window.addEventListener('load', calibrarInstrumentos);
window.addEventListener('resize', function () {
  clearTimeout(window._instrTimeout);
  window._instrTimeout = setTimeout(calibrarInstrumentos, 120);
});

// =========================
// PROCESO SECTION
// Carousel controlled by arrow buttons and dot navigation.
// =========================

document.addEventListener('DOMContentLoaded', function () {
  var slidesContainer = document.getElementById('procesoSlides');
  if (!slidesContainer) return;

  var slides = slidesContainer.querySelectorAll('.proceso__slide');
  var dots = document.querySelectorAll('.proceso__dot');
  var prevBtn = document.querySelector('.proceso__arrow--prev');
  var nextBtn = document.querySelector('.proceso__arrow--next');

  var total = slides.length;
  var currentIndex = 0;

  function goToSlide(index) {
    // Loop around in both directions.
    currentIndex = (index + total) % total;

    var offsetPercent = (currentIndex * 100) / total;
    slidesContainer.style.transform = 'translateX(-' + offsetPercent + '%)';

    dots.forEach(function (dot, i) {
      var isActive = i === currentIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  prevBtn.addEventListener('click', function () {
    goToSlide(currentIndex - 1);
  });

  nextBtn.addEventListener('click', function () {
    goToSlide(currentIndex + 1);
  });

  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      var index = parseInt(dot.getAttribute('data-index'), 10);
      goToSlide(index);
    });
  });

  // Optional: basic swipe support for touch devices.
  var startX = 0;
  var isSwiping = false;

  slidesContainer.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
    isSwiping = true;
  }, { passive: true });

  slidesContainer.addEventListener('touchend', function (e) {
    if (!isSwiping) return;
    var endX = e.changedTouches[0].clientX;
    var diff = startX - endX;

    if (Math.abs(diff) > 40) {
      diff > 0 ? goToSlide(currentIndex + 1) : goToSlide(currentIndex - 1);
    }
    isSwiping = false;
  });

  // Initialize.
  goToSlide(0);
});


// =========================
// CURSOS
// =========================
const cursosGrid = document.querySelector('.cursos__grid');
const cursosDots = document.querySelectorAll('.cursos__dot');
const cursosItems = document.querySelectorAll('.cursos__item');

if (cursosGrid) {
  function actualizarDotActivo() {
    const anchoCard = cursosItems[0].offsetWidth + 16; // 16 = gap entre cards
    const indiceActivo = Math.round(cursosGrid.scrollLeft / anchoCard);

    cursosDots.forEach((dot, i) => {
      dot.classList.toggle("cursos__dot--activo", i === indiceActivo);
    });
  }

  cursosGrid.addEventListener("scroll", () => {
    requestAnimationFrame(actualizarDotActivo);
  });

  cursosDots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      cursosGrid.scrollTo({
        left: i * (cursosItems[0].offsetWidth + 16),
        behavior: "smooth"
      });
    });
  });

  // Estado inicial
  actualizarDotActivo();
}


// =========================
// FADE UP AL SCROLLEAR
// Observa todos los elementos con .fade-up y les agrega
// .is-visible cuando entran en el viewport.
// =========================
document.addEventListener('DOMContentLoaded', function () {
  var fadeElements = document.querySelectorAll('.fade-up');
  if (!fadeElements.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Una vez visible, dejamos de observarlo
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,   // se dispara cuando el 15% del elemento es visible
    rootMargin: '0px 0px -40px 0px' // se dispara un poco antes del borde inferior
  });

  fadeElements.forEach(function (el) {
    observer.observe(el);
  });
});


// =========================
// INSTRUMENTOS — mantener hover del li cuando el mouse
// está sobre el botón de play o el nombre
// =========================
document.addEventListener('DOMContentLoaded', function () {
  var pares = [
    { trigger: '.play-violin',      item: '.instrumentos__list li:nth-child(1)' },
    { trigger: '.play-viola',       item: '.instrumentos__list li:nth-child(2)' },
    { trigger: '.play-guitarra',    item: '.instrumentos__list li:nth-child(3)' },
    { trigger: '.play-violoncello', item: '.instrumentos__list li:nth-child(4)' },
    { trigger: '.play-contrabajo',  item: '.instrumentos__list li:nth-child(5)' },
  ];

  pares.forEach(function (par) {
    var trigger = document.querySelector(par.trigger);
    var item    = document.querySelector(par.item);
    if (!trigger || !item) return;

    trigger.addEventListener('mouseenter', function () {
      item.classList.add('is-hovered');
    });

    trigger.addEventListener('mouseleave', function () {
      item.classList.remove('is-hovered');
    });
  });
});

// =========================
// PROCESO
// =========================

document.querySelectorAll('.proceso__paso').forEach(paso => {
  paso.addEventListener('click', () => {
    const yaActivo = paso.classList.contains('proceso__paso--activo');

    document.querySelectorAll('.proceso__paso').forEach(p => p.classList.remove('proceso__paso--activo'));

    if (!yaActivo){
      paso.classList.add('proceso__paso--activo');
      cambiarImagen(paso.dataset.img);
    }
  });
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.proceso__pasos')){
    document.querySelectorAll('.proceso__paso').forEach(p => p.classList.remove('proceso__paso--activo'));
  }
});

function cambiarImagen(nuevoSrc){
  const img = document.getElementById('procesoImagen');

  if (img.getAttribute('src') === nuevoSrc){
    return;   // ya está mostrando esa imagen, no hace falta animar
  }

  img.classList.add('proceso__imagen--fade');

  setTimeout(() => {
    img.src = nuevoSrc;
    img.classList.remove('proceso__imagen--fade');
  }, 350);
}


// =========================
// GALERÍA — carousel infinito con panel de info
// Clona el primer y último slide para el loop sin saltos.
// =========================
document.addEventListener('DOMContentLoaded', function () {

  var carousel  = document.getElementById('galeriaCarousel');
  var track     = document.getElementById('galeriaTrack');
  var prevBtn   = document.getElementById('galeriaPrev');
  var nextBtn   = document.getElementById('galeriaNext');
  var infoPanel = document.getElementById('galeriaInfo');
  var infoName  = document.getElementById('galeriaName');
  var infoVenue = document.getElementById('galeriaVenue');

  if (!carousel || !track) return;

  // Datos de cada músico (mismo orden que los slides en el HTML)
  var data = [
    { name: 'Tomás Ibarra',      instrument: 'Contrabajo',  venue: 'Teatro del Libertador' },
    { name: 'Valentina Ferraro', instrument: 'Viola',       venue: 'Teatro Argentino'      },
    { name: 'Aiko Tanaka',       instrument: 'Violoncello', venue: 'Teatro Colón'          },
    { name: 'Dante Fermín',      instrument: 'Violín',      venue: 'Teatro El Círculo'     },
  ];

  var realCount = data.length;

  // --- Clonar primero y último para el loop infinito ---
  var firstClone = track.children[0].cloneNode(true);
  var lastClone  = track.children[realCount - 1].cloneNode(true);
  firstClone.setAttribute('aria-hidden', 'true');
  lastClone.setAttribute('aria-hidden', 'true');
  track.appendChild(firstClone);          // clone del primero al final
  track.insertBefore(lastClone, track.children[0]); // clone del último al inicio

  var slides = track.querySelectorAll('.galeria__slide');
  var totalSlides = slides.length; // realCount + 2 clones

  // Empezamos en el índice 1 (primer slide real, después del clone-del-último)
  var currentIndex = 1;
  var isTransitioning = false;

  // --- Posicionado ---
  function getSlideWidth() {
    return slides[0].offsetWidth;
  }

  function getGap() {
    var gap = getComputedStyle(track).gap || getComputedStyle(track).columnGap;
    return parseInt(gap) || 20;
  }

function goTo(index, animated) {
  if (animated === false) {
    track.style.transition = 'none';
  } else {
    track.style.transition = 'transform 0.5s ease';
  }

  // Forzar reflow para que 'none' se aplique antes del siguiente frame
  track.offsetHeight;

  var slideW  = slides[currentIndex].offsetWidth;
  var gap     = parseInt(getComputedStyle(track).gap) || 20;
  var carouselW = carousel.offsetWidth;

  // Offset acumulado hasta el slide activo
  var accumulatedOffset = 0;
  for (var i = 0; i < index; i++) {
    accumulatedOffset += slides[i].offsetWidth + gap;
  }

  // Centrar: mover el slide activo al medio del carousel
  var center = (carouselW - slideW) / 2;
  track.style.transform = 'translateX(' + (center - accumulatedOffset) + 'px)';

  slides.forEach(function (s, i) {
    s.classList.toggle('is-active', i === index);
  });
}

  // --- Info panel ---
  function realIndexOf(index) {
    // Convierte índice del track (con clones) al índice real del array data
    return ((index - 1) + realCount) % realCount;
  }

function updateInfo(index) {
  var d = data[realIndexOf(index)];
  infoPanel.classList.add('is-fading');
  setTimeout(function () {
    // "Valentina Ferraro · Viola" en una línea
    infoName.textContent  = d.name + ' · ' + d.instrument;
    infoVenue.textContent = d.venue;
    infoPanel.classList.remove('is-fading');
  }, 150);
}

  // --- Loop infinito: salto silencioso al llegar a un clon ---
  track.addEventListener('transitionend', function () {
    isTransitioning = false;

    if (currentIndex === 0) {
      // Estamos en el clon del último → saltar al último real
      currentIndex = totalSlides - 2;
      goTo(currentIndex, false);
    }

    if (currentIndex === totalSlides - 1) {
      // Estamos en el clon del primero → saltar al primero real
      currentIndex = 1;
      goTo(currentIndex, false);
    }
  });

  // --- Navegación ---
  prevBtn.addEventListener('click', function () {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex -= 1;
    goTo(currentIndex, true);
    updateInfo(currentIndex);
  });

  nextBtn.addEventListener('click', function () {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex += 1;
    goTo(currentIndex, true);
    updateInfo(currentIndex);
  });

  // --- Swipe táctil ---
  var touchStartX = 0;
  carousel.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchend', function (e) {
    var diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? nextBtn.click() : prevBtn.click();
    }
  });

  // --- Recalcular en resize ---
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      goTo(currentIndex, false);
    }, 100);
  });

  // --- Init ---
  goTo(currentIndex, false);
  updateInfo(currentIndex);
});

// Mobile
// Mobile
if (window.innerWidth <= 768) {

  const carousel = document.querySelector(".galeria__carousel");
  const slides = document.querySelectorAll(".galeria__slide");
  const dots = document.querySelectorAll(".galeria__dot");
  const infoName = document.getElementById('galeriaName');
  const infoVenue = document.getElementById('galeriaVenue');

  const data = [
    { name: 'Tomás Ibarra',      instrument: 'Contrabajo',  venue: 'Teatro del Libertador' },
    { name: 'Valentina Ferraro', instrument: 'Viola',       venue: 'Teatro Argentino'      },
    { name: 'Aiko Tanaka',       instrument: 'Violoncello', venue: 'Teatro Colón'          },
    { name: 'Sofía Montenegro',  instrument: 'Violín',      venue: 'Teatro El Círculo'     },
  ];

  if (carousel && slides.length) {

    function actualizarGaleria() {

      const anchoSlide = slides[0].offsetWidth + 16; // 16 = gap del CSS
      let index = Math.round(carousel.scrollLeft / anchoSlide);

      // Evita índices fuera de rango
      index = Math.max(0, Math.min(index, slides.length - 1));

      // Actualizar dots
      dots.forEach((dot, i) => {
        dot.classList.toggle("galeria__dot--activo", i === index);
      });

      // Actualizar texto
      infoName.textContent =
        `${data[index].name} · ${data[index].instrument}`;

      infoVenue.textContent =
        data[index].venue;
    }

    carousel.addEventListener("scroll", () => {
      requestAnimationFrame(actualizarGaleria);
    });

    dots.forEach((dot, i) => {

      dot.addEventListener("click", () => {

        const anchoSlide = slides[0].offsetWidth + 16;

        carousel.scrollTo({
          left: i * anchoSlide,
          behavior: "smooth"
        });

      });

    });

    actualizarGaleria();
  }
}



// =========================
// APRENDER — carrusel mobile con dots
// =========================
const aprenderGrid = document.getElementById('aprenderGrid');
const aprenderDots = document.querySelectorAll('#aprenderDots .cards-dot');
const aprenderCards = aprenderGrid ? aprenderGrid.querySelectorAll('.card') : [];

if (aprenderGrid && aprenderCards.length) {

  function actualizarDotAprender() {
    const anchoCard = aprenderCards[0].offsetWidth;
    const indiceActivo = Math.round(aprenderGrid.scrollLeft / anchoCard);

    aprenderDots.forEach((dot, i) => {
      dot.classList.toggle('cards-dot--activo', i === indiceActivo);
    });
  }

  aprenderGrid.addEventListener('scroll', () => {
    requestAnimationFrame(actualizarDotAprender);
  });

  aprenderDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      aprenderGrid.scrollTo({
        left: i * aprenderCards[0].offsetWidth,
        behavior: 'smooth'
      });
    });
  });

  actualizarDotAprender();
}


// =========================
// HERRAMIENTAS CURSO — hotspots interactivos
// Desktop: hover muestra el popup (CSS).
// Mobile: click alterna el popup; click fuera lo cierra.
// El JS también rellena el contenido del popup desde data-*
// y ajusta la dirección si el popup queda fuera del viewport.
// =========================
document.addEventListener('DOMContentLoaded', function () {
  var puntos = document.querySelectorAll('.herramienta__punto');
  if (!puntos.length) return;

  // Rellenar nombre y descripción desde los atributos data-*
  puntos.forEach(function (punto) {
    var nombre = punto.getAttribute('data-nombre') || '';
    var desc   = punto.getAttribute('data-descripcion') || '';

    punto.querySelector('.herramienta__popup-nombre').textContent = nombre;
    punto.querySelector('.herramienta__popup-desc').textContent   = desc;
  });

  // Ajustar dirección del popup según posición en pantalla
  function ajustarDireccion(punto) {
    var rect      = punto.getBoundingClientRect();
    var viewW     = window.innerWidth;
    var viewH     = window.innerHeight;
    var popupW    = 240;
    var popupH    = 90;

    // Resetear clases de dirección
    punto.classList.remove('popup-right', 'popup-left', 'popup-bottom');

    // Si está muy arriba: popup hacia abajo
    if (rect.top < popupH + 20) {
      punto.classList.add('popup-bottom');
      return;
    }

    // Si está muy a la izquierda: popup hacia la derecha
    if (rect.left < popupW / 2 + 20) {
      punto.classList.add('popup-right');
      return;
    }

    // Si está muy a la derecha: popup hacia la izquierda
    if (rect.right > viewW - popupW / 2 - 20) {
      punto.classList.add('popup-left');
      return;
    }

    // Por defecto: popup hacia arriba (lo maneja el CSS base)
  }

  // Mobile: toggle con click
  var isMobile = window.matchMedia('(hover: none)').matches;

  if (isMobile) {
    puntos.forEach(function (punto) {
      punto.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = punto.classList.contains('is-open');

        // Cerrar todos
        puntos.forEach(function (p) { p.classList.remove('is-open'); });

        if (!isOpen) {
          ajustarDireccion(punto);
          punto.classList.add('is-open');
        }
      });
    });

    // Click fuera cierra todos
    document.addEventListener('click', function () {
      puntos.forEach(function (p) { p.classList.remove('is-open'); });
    });
  } else {
    // Desktop: ajustar dirección al hacer hover
    puntos.forEach(function (punto) {
      punto.addEventListener('mouseenter', function () {
        ajustarDireccion(punto);
      });
    });
  }
});

// =========================
// ESTUDIANTES — carrusel mobile con dots
// =========================
const estudiantesGrid = document.getElementById('estudiantesGrid');
const estudiantesDots = document.querySelectorAll('#estudiantesDots .estudiantes-dot');
const estudiantesCards = estudiantesGrid ? estudiantesGrid.querySelectorAll('.estudiante-item') : [];

if (estudiantesGrid && estudiantesCards.length) {

  function actualizarDotEstudiantes() {
    const anchoCard = estudiantesCards[0].offsetWidth;
    const indiceActivo = Math.round(estudiantesGrid.scrollLeft / anchoCard);

    estudiantesDots.forEach((dot, i) => {
      dot.classList.toggle('estudiantes-dot--activo', i === indiceActivo);
    });
  }

  estudiantesGrid.addEventListener('scroll', () => {
    requestAnimationFrame(actualizarDotEstudiantes);
  });

  estudiantesDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      estudiantesGrid.scrollTo({
        left: i * estudiantesCards[0].offsetWidth,
        behavior: 'smooth'
      });
    });
  });

  actualizarDotEstudiantes();
}

// =========================
// Página Curso - ACORDEÓN — Programa del curso
// =========================
document.addEventListener('DOMContentLoaded', function () {
  var items = document.querySelectorAll('.curso-acordeon__item');
  if (!items.length) return;

  items.forEach(function (item) {
    var header = item.querySelector('.curso-acordeon__header');
    var body   = item.querySelector('.curso-acordeon__body');

    header.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');

      // Cerrar todos los items abiertos
      items.forEach(function (other) {
        other.classList.remove('is-open');
        other.querySelector('.curso-acordeon__header').setAttribute('aria-expanded', 'false');
        other.querySelector('.curso-acordeon__body').style.display = 'none';
      });

      // Si estaba cerrado, abrirlo
      if (!isOpen) {
        item.classList.add('is-open');
        header.setAttribute('aria-expanded', 'true');
        body.style.display = 'block';
      }
    });

    // Estado inicial: todos cerrados
    body.style.display = 'none';
  });
});

})();


// =========================
// Página Curso - Estudiantes
// =========================
document.addEventListener('DOMContentLoaded', () => {
  const estudiantesItems = document.querySelectorAll('.estudiante-item');

  estudiantesItems.forEach(item => {
    item.addEventListener('click', () => {
      estudiantesItems.forEach(i => i.classList.remove('estudiante-item--activa'));
      item.classList.add('estudiante-item--activa');
    });
  });
});

