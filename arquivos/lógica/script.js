/* =========================================================
   SCRIPT NINJA OTIMIZADO (v3.2) - CORREÇÃO DE BOTÃO DO MODAL
   - Sistema de Modal Centralizado e Reutilizável
   - Animações de Filtro Suaves
   - Otimizações de Performance
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // --- FUNÇÕES DE OTIMIZAÇÃO (DEBOUNCE & THROTTLE) ---
  const debounce = (func, delay) => {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  // --- 1. INICIALIZAÇÃO GERAL (LOADER, ANIMAÇÕES, PARTÍCULAS) ---
  const loader = document.getElementById('loader');
  const fadeInElements = document.querySelectorAll('.fade-in-up');
  const particlesEl = document.getElementById('particles-js');

  // Loader
  window.addEventListener('load', () => {
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => loader.style.display = 'none', 500);
    }
  });

  // Animações de entrada com Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('loaded');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  fadeInElements.forEach(el => observer.observe(el));

  // Partículas
  if (particlesEl) {
    particlesJS("particles-js", { "particles":{ "number":{ "value":80,"density":{ "enable":true,"value_area":800 } },"color":{ "value":"#ffffff" },"shape":{ "type":"circle" },"opacity":{ "value":0.5,"random":true,"anim":{ "enable":true,"speed":1,"opacity_min":0.1,"sync":false } },"size":{ "value":3,"random":true },"line_linked":{ "enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1 },"move":{ "enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false } },"interactivity":{ "detect_on":"canvas","events":{ "onhover":{ "enable":true,"mode":"repulse" },"onclick":{ "enable":true,"mode":"push" },"resize":true },"modes":{ "repulse":{ "distance":200,"duration":0.4 },"push":{ "particles_nb":4 } } },"retina_detect":true });
  }

  // --- 2. EFEITO 3D E SPOTLIGHT NOS CARDS ---
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.setProperty('--spotlight-x', `${x}px`);
      card.style.setProperty('--spotlight-y', `${y}px`);
      card.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px) scale(1.04)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1500px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
  });

  // --- 3. SISTEMA DE MODAL CENTRALIZADO ---
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  // AQUI ESTÁ A MUDANÇA: Usamos a nova classe 'js-close-modal'
  const closeButtons = document.querySelectorAll('.js-close-modal');
  const gameModal = document.getElementById('gameModal');
  const gameEmbedContainer = document.getElementById('gameEmbedContainer');

  const openModal = (modal) => {
    if (modal) modal.classList.add('is-visible');
  };

  const closeModal = (modal) => {
    if (modal) {
      modal.classList.remove('is-visible');
      if (modal.id === 'gameModal' && gameEmbedContainer) {
        setTimeout(() => { gameEmbedContainer.innerHTML = ''; }, 300);
      }
    }
  };

  modalTriggers.forEach(button => {
    button.addEventListener('click', () => {
      const modal = document.querySelector(button.dataset.modalTarget);
      openModal(modal);
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal-overlay');
      closeModal(modal);
    });
  });

  document.querySelectorAll('.play-emulator-btn').forEach(button => {
    button.addEventListener('click', () => {
      const gameSrc = button.dataset.src;
      if (gameSrc && gameEmbedContainer && gameModal) {
        gameEmbedContainer.innerHTML = `<iframe src="${gameSrc}" allowfullscreen></iframe>`;
        openModal(gameModal);
      }
    });
  });

  // --- 4. FUNCIONALIDADE DE BUSCA E FILTRO (OTIMIZADA) ---
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    const allCards = document.querySelectorAll('#linksContainer .card');
    const noResultsMessage = document.getElementById('noResultsMessage');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let activeFilter = 'all';

    const updateVisibleCards = () => {
      const searchTerm = searchInput.value.toLowerCase().trim();
      let cardsFound = 0;

      allCards.forEach(card => {
        const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const description = card.querySelector('p')?.textContent.toLowerCase() || '';
        const tags = card.dataset.tags || '';

        const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
        const matchesFilter = activeFilter === 'all' || tags.includes(activeFilter);

        const shouldBeVisible = matchesSearch && matchesFilter;
        
        card.style.display = shouldBeVisible ? 'flex' : 'none';

        if (shouldBeVisible) cardsFound++;
      });

      if (noResultsMessage) {
        noResultsMessage.style.display = cardsFound > 0 ? 'none' : 'block';
      }
    };

    searchInput.addEventListener('keyup', debounce(updateVisibleCards, 300));

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        activeFilter = button.dataset.filter;
        updateVisibleCards();
      });
    });
  }

  // --- 5. BOTÃO "VOLTAR AO TOPO" ---
  const backToTopButton = document.getElementById('backToTop');
  if (backToTopButton) {
    const handleScroll = () => {
      const isVisible = window.scrollY > 300;
      backToTopButton.style.opacity = isVisible ? '1' : '0';
      backToTopButton.style.bottom = isVisible ? '1.5rem' : '-100px';
    };
    window.addEventListener('scroll', throttle(handleScroll, 150));
    backToTopButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // --- 6. FUNCIONALIDADE DE COPIAR SCRIPT ---
  const copyMessage = document.getElementById('copyMessage');
  document.querySelectorAll('.copy-script-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const scriptToCopy = btn.dataset.script;
      navigator.clipboard.writeText(scriptToCopy).then(() => {
        if (copyMessage) {
          copyMessage.style.opacity = '1';
          copyMessage.style.transform = 'translate(-50%, 0)';
          setTimeout(() => {
            copyMessage.style.opacity = '0';
            copyMessage.style.transform = 'translate(-50%, -2.5rem)';
          }, 2500);
        }
      }).catch(err => console.error('Falha ao copiar script: ', err));
    });
  });
});
