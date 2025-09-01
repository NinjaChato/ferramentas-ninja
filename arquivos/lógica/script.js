/* =========================================================
   SCRIPT OTIMIZADO (v2.2) - PERFORMANCE E INTERATIVIDADE
   - Lógica de aviso removida para ser controlada por scripts locais.
   - Mantida a funcionalidade de busca e filtro de tags.
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // --- FUNÇÕES DE OTIMIZAÇÃO (THROTTLE & DEBOUNCE) ---
  const throttle = (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  const debounce = (func, delay) => {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  };

  // --- 1. CONFIGURAÇÃO DO PARTICLES.JS ---
  if (document.getElementById('particles-js')) {
    particlesJS("particles-js", { /* Configuração de particles.js */
      "particles":{ "number":{ "value":80,"density":{ "enable":true,"value_area":800 } },"color":{ "value":"#ffffff" },"shape":{ "type":"circle" },"opacity":{ "value":0.5,"random":true,"anim":{ "enable":true,"speed":1,"opacity_min":0.1,"sync":false } },"size":{ "value":3,"random":true },"line_linked":{ "enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1 },"move":{ "enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false } },"interactivity":{ "detect_on":"canvas","events":{ "onhover":{ "enable":true,"mode":"repulse" },"onclick":{ "enable":true,"mode":"push" },"resize":true },"modes":{ "repulse":{ "distance":200,"duration":0.4 },"push":{ "particles_nb":4 } } },"retina_detect":true
    });
  }

  // --- 2. LOADER E ANIMAÇÕES DE ENTRADA INTELIGENTES ---
  const loader = document.getElementById('loader');
  const fadeInElements = document.querySelectorAll('.fade-in-up');

  window.addEventListener('load', () => {
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => loader.style.display = 'none', 500);
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('loaded');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeInElements.forEach(el => observer.observe(el));


  // --- 3. EFEITO 3D E SPOTLIGHT NOS CARDS ---
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    let animationFrameId = null;

    card.addEventListener('mousemove', (e) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.setProperty('--spotlight-x', `${x}px`);
        card.style.setProperty('--spotlight-y', `${y}px`);
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px) scale(1.04)`;
      });
    });

    card.addEventListener('mouseleave', () => {
      cancelAnimationFrame(animationFrameId);
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
  });


  // --- 4. FUNCIONALIDADE DE BUSCA E FILTRO (OTIMIZADA) ---
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    const linksContainer = document.getElementById('linksContainer');
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

        const isVisible = matchesSearch && matchesFilter;
        
        card.style.display = isVisible ? 'block' : 'none';
        if (isVisible) cardsFound++;
      });

      const hasResults = cardsFound > 0;
      if (linksContainer) linksContainer.style.display = hasResults ? 'block' : 'none';
      if (noResultsMessage) noResultsMessage.style.display = hasResults ? 'none' : 'block';
    };
    
    searchInput.addEventListener('keyup', debounce(updateVisibleCards, 250));

    if (filterButtons.length > 0) {
      filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          filterButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          activeFilter = button.dataset.filter;
          updateVisibleCards();
        });
      });
    }
  }

  // --- 5. BOTÃO "VOLTAR AO TOPO" (OTIMIZADO COM THROTTLE) ---
  const backToTopButton = document.getElementById('backToTop');
  if (backToTopButton) {
    const handleScroll = () => {
      const isVisible = window.scrollY > 300;
      backToTopButton.style.opacity = isVisible ? '1' : '0';
      backToTopButton.style.bottom = isVisible ? '1.5rem' : '-100px';
    };

    window.addEventListener('scroll', throttle(handleScroll, 100));
    backToTopButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // --- 6. FUNCIONALIDADE DE COPIAR SCRIPT ---
  const copyMessage = document.getElementById('copyMessage');
  const copyScriptBtns = document.querySelectorAll('.copy-script-btn');
  if (copyMessage && copyScriptBtns.length > 0) {
    copyScriptBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const scriptToCopy = btn.dataset.script;
        navigator.clipboard.writeText(scriptToCopy).then(() => {
          copyMessage.style.opacity = '1';
          copyMessage.style.transform = 'translate(-50%, 0)';
          setTimeout(() => {
            copyMessage.style.opacity = '0';
            copyMessage.style.transform = 'translate(-50%, -2.5rem)';
          }, 2000);
        }).catch(err => {
          console.error('Falha ao copiar script: ', err);
        });
      });
    });
  }
});
