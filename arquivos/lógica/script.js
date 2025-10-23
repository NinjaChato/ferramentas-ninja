/* =========================================================
   SCRIPT NINJA OTIMIZADO (v5.0 - Emulator-Focused)
   - Focado em carregar emulators.json para a página de emuladores.
   - Outras funcionalidades (busca, modais de aviso, etc.) mantidas.
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // --- FUNÇÕES DE OTIMIZAÇÃO ---
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

  // --- INICIALIZAÇÃO GERAL ---
  const loader = document.getElementById('loader');
  const fadeInElements = document.querySelectorAll('.fade-in-up');
  const particlesEl = document.getElementById('particles-js');

  window.addEventListener('load', () => { if (loader) { loader.style.opacity = '0'; setTimeout(() => loader.style.display = 'none', 500); } });
  const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('loaded'); observer.unobserve(entry.target); } }); }, { threshold: 0.1 });
  fadeInElements.forEach(el => observer.observe(el));
  if (particlesEl) { particlesJS("particles-js", { "particles":{ "number":{ "value":80,"density":{ "enable":true,"value_area":800 } },"color":{ "value":"#ffffff" },"shape":{ "type":"circle" },"opacity":{ "value":0.5,"random":true,"anim":{ "enable":true,"speed":1,"opacity_min":0.1,"sync":false } },"size":{ "value":3,"random":true },"line_linked":{ "enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1 },"move":{ "enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false } },"interactivity":{ "detect_on":"canvas","events":{ "onhover":{ "enable":true,"mode":"repulse" },"onclick":{ "enable":true,"mode":"push" },"resize":true },"modes":{ "repulse":{ "distance":200,"duration":0.4 },"push":{ "particles_nb":4 } } },"retina_detect":true }); }

  // --- EFEITO 3D NOS CARDS ---
  const setupCardEffects = () => {
      const cards = document.querySelectorAll('.card');
      cards.forEach(card => {
        if (card.dataset.hoverEffectApplied) return;
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -4;
          const rotateY = ((x - centerX) / centerX) * 4;
          card.style.setProperty('--spotlight-x', `${x}px`);
          card.style.setProperty('--spotlight-y', `${y}px`);
          card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = 'rotateX(0) rotateY(0) translateY(0) scale(1)'; });
        card.dataset.hoverEffectApplied = 'true';
      });
  };
  
  // --- SISTEMA DE MODAL (PARA AVISOS, ETC) ---
  const setupModals = () => {
      const modalTriggers = document.querySelectorAll('[data-modal-target]');
      const closeButtons = document.querySelectorAll('.js-close-modal');
      
      const openModal = (modal) => { if (modal) modal.classList.add('is-visible'); };
      const closeModal = (modal) => { if (modal) modal.classList.remove('is-visible'); };

      modalTriggers.forEach(button => { button.addEventListener('click', () => { const modal = document.querySelector(button.dataset.modalTarget); openModal(modal); }); });
      document.querySelectorAll('.modal-overlay').forEach(overlay => { overlay.addEventListener('click', (e) => { if (e.target === overlay) { closeModal(overlay); } }); });
      closeButtons.forEach(button => { button.addEventListener('click', () => { const modal = button.closest('.modal-overlay'); closeModal(modal); }); });
  };

  // --- BUSCA E FILTRO ---
  const setupSearchAndFilters = () => {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    const noResultsMessage = document.getElementById('noResultsMessage');
    
    const updateVisibleCards = () => {
      const searchTerm = searchInput.value.toLowerCase().trim();
      const allCards = document.querySelectorAll('#linksContainer .card');
      let cardsFound = 0;
      allCards.forEach(card => {
        const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const description = card.querySelector('p')?.textContent.toLowerCase() || '';
        const shouldBeVisible = title.includes(searchTerm) || description.includes(searchTerm);
        card.style.display = shouldBeVisible ? 'flex' : 'none';
        if (shouldBeVisible) cardsFound++;
      });
      if (noResultsMessage) {
        noResultsMessage.style.display = cardsFound > 0 ? 'none' : 'block';
      }
    };
    searchInput.addEventListener('keyup', debounce(updateVisibleCards, 300));
  };
  
  // --- BOTÃO "VOLTAR AO TOPO" ---
  const setupBackToTop = () => {
    const backToTopButton = document.getElementById('backToTop');
    if (!backToTopButton) return;
    const handleScroll = () => {
      const isVisible = window.scrollY > 300;
      backToTopButton.style.opacity = isVisible ? '1' : '0';
      backToTopButton.style.bottom = isVisible ? '1.5rem' : '-100px';
    };
    window.addEventListener('scroll', throttle(handleScroll, 150));
    backToTopButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  };

  // --- CARREGAMENTO DE CONTEÚDO DINÂMICO ---
  const loadDynamicContent = async () => {
    if (window.location.pathname.includes('jogos-emulador.html')) {
        const linksContainer = document.getElementById('linksContainer');
        if (!linksContainer) return;

        try {
            const response = await fetch('emulators.json');
            const games = await response.json();
            linksContainer.innerHTML = '';
            games.forEach(game => {
                const cardHTML = `
                <div class="card">
                    <div class="card-content p-6 flex flex-col justify-between h-full">
                        <div>
                            <div class="text-3xl mb-4"><i class="${game.icon}"></i></div>
                            <h3 class="text-2xl font-bold mb-2">${game.name}</h3>
                            <p class="text-muted mb-4">${game.description}</p>
                        </div>
                        <a href="player.html?system=${game.system}&rom=${game.rom}" target="_blank" rel="noopener noreferrer" class="action-btn text-white font-bold py-3 px-4 rounded-lg w-full text-center mt-4">Jogar Agora</a>
                    </div>
                </div>`;
                linksContainer.insertAdjacentHTML('beforeend', cardHTML);
            });
        } catch (error) {
            console.error('Erro ao carregar emulators.json:', error);
            linksContainer.innerHTML = '<p class="text-center text-red-500 col-span-full">Ocorreu um erro ao carregar a lista de jogos.</p>';
        }
    }
    setupCardEffects();
  };

  // --- INICIALIZAÇÃO ---
  setupModals();
  setupSearchAndFilters();
  setupBackToTop();
  loadDynamicContent();
});
