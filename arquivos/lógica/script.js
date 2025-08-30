document.addEventListener('DOMContentLoaded', () => {

  // --- 1. CONFIGURAÇÃO DO PARTICLES.JS ---
  // Inicializa a animação de partículas no fundo
  if (document.getElementById('particles-js')) {
    particlesJS("particles-js", {
      "particles": {
        "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#ffffff" },
        "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 } },
        "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
        "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } },
        "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
        "move": { "enable": true, "speed": 6, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
        "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } }
      },
      "retina_detect": true
    });
  }

  // --- 2. LOADER E ANIMAÇÕES DE ENTRADA ---
  const loader = document.getElementById('loader');
  const fadeInElements = document.querySelectorAll('.fade-in-up');

  // Esconde o loader e ativa as animações quando a página estiver totalmente carregada
  window.addEventListener('load', () => {
    if (loader) {
        loader.style.opacity = '0';
        // Remove o loader da tela após a transição para não bloquear interações
        setTimeout(() => loader.style.display = 'none', 500);
    }

    // Adiciona a classe 'loaded' para iniciar a animação de entrada
    fadeInElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('loaded');
      }, index * 100); // Efeito cascata sutil
    });
  });

  // --- 3. EFEITO SPOTLIGHT NOS CARDS (NOVO E MELHORADO) ---
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--spotlight-x', `${x}px`);
      card.style.setProperty('--spotlight-y', `${y}px`);
    });
  });

  // --- 4. FUNCIONALIDADE DE BUSCA ---
  const searchInput = document.getElementById('searchInput');
  const linksContainer = document.getElementById('linksContainer');
  const allCards = document.querySelectorAll('#linksContainer .card');
  const noResultsMessage = document.getElementById('noResultsMessage');

  if (searchInput && linksContainer && noResultsMessage) {
    searchInput.addEventListener('keyup', () => {
      const searchTerm = searchInput.value.toLowerCase().trim();
      let found = false;

      allCards.forEach(card => {
        const title = card.querySelector('h3')?.textContent.toLowerCase();
        const description = card.querySelector('p')?.textContent.toLowerCase();

        if (title.includes(searchTerm) || description.includes(searchTerm)) {
          card.style.display = 'block';
          found = true;
        } else {
          card.style.display = 'none';
        }
      });

      if (found) {
        linksContainer.style.display = 'block';
        noResultsMessage.style.display = 'none';
      } else {
        linksContainer.style.display = 'none';
        noResultsMessage.style.display = 'block';
      }
    });
  }

  // --- 5. AVISO DE NAVEGAÇÃO SEGURA (PSIPHON) ---
  const psiphonNotice = document.getElementById('psiphonNotice');
  const closeNoticeBtn = document.getElementById('closeNoticeBtn');
  const understandBtn = document.getElementById('understandBtn');

  if (psiphonNotice && closeNoticeBtn && understandBtn) {
    // Mostra o aviso apenas se o usuário ainda não o fechou
    if (!localStorage.getItem('psiphonNoticeClosed')) {
      // Pequeno delay para não aparecer abruptamente
      setTimeout(() => psiphonNotice.classList.remove('hidden'), 1500);
    }

    const closeNotice = () => {
      psiphonNotice.style.opacity = '0';
      setTimeout(() => psiphonNotice.classList.add('hidden'), 300);
      localStorage.setItem('psiphonNoticeClosed', 'true');
    };

    closeNoticeBtn.addEventListener('click', closeNotice);
    understandBtn.addEventListener('click', closeNotice);
  }

  // --- 6. BOTÃO "VOLTAR AO TOPO" ---
  const backToTopButton = document.getElementById('backToTop');
  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) { // Mostra o botão após rolar 300px
        backToTopButton.style.opacity = '1';
        backToTopButton.style.bottom = '1.5rem';
      } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.bottom = '-100px';
      }
    });

    backToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
