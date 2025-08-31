/* =========================================================
   SCRIPT OTIMIZADO (v2.3) - COM CRIPTOGRAFIA DE CONTEÚDO
   A senha descriptografa o conteúdo em vez de apenas mostrá-lo.
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
  window.addEventListener('load', () => {
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => loader.style.display = 'none', 500);
    }
  });

  const initFadeInObserver = () => {
    const fadeInElements = document.querySelectorAll('.fade-in-up');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('loaded');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    fadeInElements.forEach(el => observer.observe(el));
  };
  initFadeInObserver(); // Roda na carga inicial

  // --- 3. EFEITO 3D E SPOTLIGHT NOS CARDS ---
  const initCardEffects = () => {
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
  };
  initCardEffects(); // Roda na carga inicial

  // --- 4. FUNCIONALIDADE DE BUSCA ---
  const initSearch = () => {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      const linksContainer = document.getElementById('linksContainer');
      const noResultsMessage = document.getElementById('noResultsMessage');
      const performSearch = () => {
        const allCards = linksContainer.querySelectorAll('.card'); // Busca os cards novamente
        const searchTerm = searchInput.value.toLowerCase().trim();
        let cardsFound = 0;
        allCards.forEach(card => {
          const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
          const description = card.querySelector('p')?.textContent.toLowerCase() || '';
          const isVisible = title.includes(searchTerm) || description.includes(searchTerm);
          card.style.display = isVisible ? 'block' : 'none';
          if (isVisible) cardsFound++;
        });
        const hasResults = cardsFound > 0;
        if (linksContainer) linksContainer.style.display = hasResults ? 'block' : 'none';
        if (noResultsMessage) noResultsMessage.style.display = hasResults ? 'none' : 'block';
      };
      searchInput.addEventListener('keyup', debounce(performSearch, 250));
    }
  };
  // A busca será inicializada APÓS a descriptografia

  // --- 5. AVISO DE NAVEGAÇÃO SEGURA (PSIPHON) ---
  const psiphonNotice = document.getElementById('psiphonNotice');
  if (psiphonNotice) {
    const closeNoticeBtn = document.getElementById('closeNoticeBtn');
    const understandBtn = document.getElementById('understandBtn');

    if (!localStorage.getItem('psiphonNoticeClosed')) {
      setTimeout(() => psiphonNotice.classList.remove('hidden'), 1500);
    }

    const closeNotice = () => {
      psiphonNotice.style.opacity = '0';
      setTimeout(() => psiphonNotice.classList.add('hidden'), 300);
      localStorage.setItem('psiphonNoticeClosed', 'true');
    };

    if (closeNoticeBtn) closeNoticeBtn.addEventListener('click', closeNotice);
    if (understandBtn) understandBtn.addEventListener('click', closeNotice);
  }

  // --- 6. BOTÃO "VOLTAR AO TOPO" ---
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

  // --- 7. FUNCIONALIDADE DE COPIAR SCRIPT ---
  const initCopyScript = () => {
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
          }).catch(err => console.error('Falha ao copiar script: ', err));
        });
      });
    }
  };
  // A cópia será inicializada APÓS a descriptografia

  // --- 8. PROTEÇÃO DE SENHA E DESCRIPTOGRAFIA DE CONTEÚDO ---
  const passwordModal = document.getElementById('passwordModal');
  if (passwordModal) {
    const protectedContent = document.getElementById('protectedContent');
    const passwordForm = document.getElementById('passwordForm');
    const passwordInput = document.getElementById('passwordInput');
    const errorMessage = document.getElementById('errorMessage');
    const encryptedContentEl = document.getElementById('encryptedContent');
    const linksContainer = document.getElementById('linksContainer');

    const unlockPage = (password) => {
      try {
        const encryptedData = encryptedContentEl.textContent;
        // A descriptografia usa AES, decodificando de Base64 e esperando texto UTF8.
        const bytes = CryptoJS.AES.decrypt(encryptedData, password);
        const decryptedHtml = bytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedHtml) { // Se a descriptografia falhar, o resultado é uma string vazia.
          throw new Error("Decryption failed: incorrect password or corrupted data.");
        }

        linksContainer.innerHTML = decryptedHtml;
        sessionStorage.setItem('hacksAccessKey', password); // Salva a senha correta na sessão

        passwordModal.style.opacity = '0';
        setTimeout(() => passwordModal.style.display = 'none', 500);
        protectedContent.classList.remove('hidden');

        // REINICIALIZA AS FUNÇÕES QUE DEPENDEM DO CONTEÚDO CARREGADO
        initFadeInObserver();
        initCardEffects();
        initSearch();
        initCopyScript();

      } catch (error) {
        console.error("Decryption error:", error);
        // Limpa a chave da sessão em caso de erro para forçar nova tentativa
        sessionStorage.removeItem('hacksAccessKey');
        
        // Mostra a mensagem de erro apenas se o modal ainda estiver visível
        if (passwordModal.style.display !== 'none') {
            errorMessage.style.opacity = '1';
            passwordModal.querySelector('.glass-effect').classList.add('shake');
            passwordInput.value = '';
            setTimeout(() => {
              errorMessage.style.opacity = '0';
              passwordModal.querySelector('.glass-effect').classList.remove('shake');
            }, 2000);
        }
      }
    };

    // Verifica se já tem uma chave de acesso na sessão para não pedir a senha novamente
    const sessionKey = sessionStorage.getItem('hacksAccessKey');
    if (sessionKey) {
      unlockPage(sessionKey);
    }

    passwordForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const userInput = passwordInput.value;
      if (userInput) {
        unlockPage(userInput);
      }
    });
  }
});
