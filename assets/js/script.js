document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Menú mobile del KIT (sidebar como drawer) ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('navOverlay');

  function openMenu(){
    sidebar.classList.add('is-open');
    overlay.classList.add('is-visible');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu(){
    sidebar.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  menuToggle.addEventListener('click', () => {
    sidebar.classList.contains('is-open') ? closeMenu() : openMenu();
  });
  overlay.addEventListener('click', closeMenu);

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 960) closeMenu();
    });
  });

  /* ---------- Toggle "Simular estados" (hover fijo en botones/cards) ---------- */
  const hoverSim = document.getElementById('hoverSim');
  hoverSim.addEventListener('change', () => {
    document.body.classList.toggle('simulate-hover', hoverSim.checked);
  });

  /* ---------- Copiar Hex ---------- */
  document.querySelectorAll('.copy-btn').forEach(btn => {
    const originalText = btn.textContent;
    btn.addEventListener('click', async () => {
      const hex = btn.getAttribute('data-hex');
      try {
        await navigator.clipboard.writeText(hex);
      } catch (err) {
        const temp = document.createElement('textarea');
        temp.value = hex;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
      }
      btn.textContent = '¡Copiado!';
      setTimeout(() => { btn.textContent = originalText; }, 1500);
    });
  });

  /* ---------- Acordeón ---------- */
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      trigger.closest('.accordion-item').classList.toggle('is-open');
    });
  });

  /* ---------- Mockup de navegación (.header real) ---------- */
  const navDemoFrame = document.getElementById('navDemoFrame');
  const toggleScrolled = document.getElementById('toggleScrolled');
  const toggleDrawer = document.getElementById('toggleDrawer');
  const navDemoToggle = document.getElementById('navDemoToggle');

  toggleScrolled.addEventListener('click', () => {
    navDemoFrame.classList.toggle('is-scrolled');
    toggleScrolled.textContent = navDemoFrame.classList.contains('is-scrolled')
      ? 'Volver a transparente'
      : 'Simular scroll';
  });

  function toggleDrawerState(){
    const isOpen = navDemoFrame.classList.toggle('is-drawer-open');
    toggleDrawer.textContent = isOpen ? 'Cerrar menú mobile' : 'Abrir menú mobile';
    navDemoToggle.classList.toggle('bi-list', !isOpen);
    navDemoToggle.classList.toggle('bi-x', isOpen);
  }
  toggleDrawer.addEventListener('click', toggleDrawerState);
  navDemoToggle.addEventListener('click', toggleDrawerState);

  /* ---------- Resaltar link activo del kit según scroll ---------- */
  const sections = document.querySelectorAll('.doc-section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
  sections.forEach(section => sectionObserver.observe(section));

  /* ---------- Fade-up: mismo utilitario de scroll-reveal que usás en el sitio ---------- */
  const fadeUpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        fadeUpObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.fade-up').forEach(el => fadeUpObserver.observe(el));

  /* ---------- Scroll-top ---------- */
  const scrollTopBtn = document.getElementById('scrollTop');
  function toggleScrollTop(){
    if (window.scrollY > 300) scrollTopBtn.classList.add('active');
    else scrollTopBtn.classList.remove('active');
  }
  window.addEventListener('scroll', toggleScrollTop);
  toggleScrollTop();
  scrollTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});
