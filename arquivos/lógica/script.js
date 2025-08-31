<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hacks | Ferramentas Ninja</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
    <link rel="stylesheet" href="lógica/style.css">
</head>
<body class="p-4">
    <div id="loader"><div class="spinner"></div></div>
    <div id="particles-js"></div>
    <div id="psiphonNotice" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10001] flex items-center justify-center p-4 hidden">
      <div class="glass-effect max-w-md w-full p-8 rounded-2xl text-center relative">
        <button id="closeNoticeBtn" class="absolute top-4 right-4 text-muted hover:text-light transition-colors text-2xl">&times;</button>
        <i class="fas fa-shield-alt text-5xl text-primary-glow mb-4"></i>
        <h2 class="text-2xl font-bold mb-3">Navegação Segura</h2>
        <p class="text-muted mb-6">Para acessar sites de download que possam estar bloqueados, recomendamos o uso de uma VPN como o <strong class="text-light">Psiphon</strong> (disponível na seção Ferramentas) para garantir seu acesso. </p>
        <button id="understandBtn" class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300">Entendi</button>
      </div>
    </div>

    <div id="mainContainer" class="max-w-6xl mx-auto w-full">
        <header class="fade-in-up glass-effect p-6 md:p-8 mb-12 rounded-2xl mt-4">
            <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                <div>
                    <h1 class="main-title">Ferramentas Ninja</h1>
                    <p class="subtitle text-lg text-muted mt-2 max-w-2xl">Seu portal seguro e estiloso para jogos, ferramentas e recursos essenciais.</p>
                </div>
                <a href="updates.txt" target="_blank" rel="noopener noreferrer" class="changelogs-btn bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg whitespace-nowrap">
                    <i class="fas fa-history fa-spin-pulse" style="--fa-animation-duration: 5s;"></i> Changelogs
                </a>
            </div>
            <div class="mt-8">
                <div class="relative">
                    <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-muted text-xl"></i>
                    <input type="text" id="searchInput" class="w-full bg-black/20 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-lg text-light placeholder-muted focus:ring-2 focus:ring-primary-glow focus:border-primary-glow transition-all duration-300 outline-none" placeholder="Busque hacks nesta categoria...">
                </div>
                <div class="category-buttons flex flex-wrap justify-center gap-2 md:gap-4 mt-6">
                    <a href="index.html" class="category-btn"><i class="fas fa-home mr-2"></i>Início</a>
                    <a href="jogos-pc.html" class="category-btn"><i class="fas fa-desktop mr-2"></i>Jogos PC</a>
                    <a href="jogos-navegador.html" class="category-btn"><i class="fas fa-globe mr-2"></i>Navegador</a>
                    <a href="jogos-emulador.html" class="category-btn"><i class="fas fa-ghost mr-2"></i>Emulador</a>
                    <a href="hacks.html" class="category-btn active"><i class="fas fa-user-secret mr-2"></i>Hacks</a>
                    <a href="ferramentas.html" class="category-btn"><i class="fas fa-tools mr-2"></i>Ferramentas</a>
                </div>
            </div>
        </header>

        <main class="fade-in-up container mx-auto px-4">
            <div id="linksContainer">
                <section class="hacks mb-16">
                    <h2 class="section-title text-center">Hacks</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                        <div class="card">
                            <div class="card-content p-6 flex flex-col justify-between h-full">
                              <div>
                                <div class="text-3xl mb-4"><i class="fas fa-laptop-code"></i></div>
                                <h3 class="text-2xl font-bold mb-2">ALURA</h3>
                                <p class="text-muted mb-4">Acesso a cursos e conteúdos da plataforma Alura.</p>
                              </div>
                              <a href="https://crimsonstrauss.xyz/alura" target="_blank" rel="noopener noreferrer" class="action-btn text-white font-bold py-3 px-4 rounded-lg w-full text-center mt-4">Acessar</a>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-content p-6 flex flex-col justify-between h-full">
                              <div>
                                <div class="text-3xl mb-4"><i class="fas fa-file-alt"></i></div>
                                <h3 class="text-2xl font-bold mb-2">APOSTILAS</h3>
                                <p class="text-muted mb-4">Coleção de apostilas e materiais de estudo.</p>
                              </div>
                              <a href="https://apostiladestroyer.netlify.app/" target="_blank" rel="noopener noreferrer" class="action-btn text-white font-bold py-3 px-4 rounded-lg w-full text-center mt-4">Acessar</a>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-content p-6 flex flex-col justify-between h-full">
                              <div>
                                <div class="text-3xl mb-4"><i class="fas fa-graduation-cap"></i></div>
                                <h3 class="text-2xl font-bold mb-2">KHAN ACADEMY</h3>
                                <p class="text-muted mb-4">Script para recursos adicionais na Khan Academy. <br><span class="text-sm opacity-70 mt-2 block">Copie o script, adicione aos favoritos e clique com a Khan Academy aberta.</span></p>
                              </div>
                              <button class="action-btn copy-script-btn text-white font-bold py-3 px-4 rounded-lg w-full text-center mt-4" data-script='javascript:fetch("https://raw.githubusercontent.com/Niximkk/Khanware/refs/heads/main/Khanware.js").then(t=>t.text()).then(eval);'>
                                <i class="fas fa-copy mr-2"></i>Copiar Script
                              </button>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-content p-6 flex flex-col justify-between h-full">
                              <div>
                                <div class="text-3xl mb-4"><i class="fas fa-book-reader"></i></div>
                                <h3 class="text-2xl font-bold mb-2">LEIA SP</h3>
                                <p class="text-muted mb-4">Recursos para leitura e estudo do Leia SP.</p>
                              </div>
                              <a href="https://leiasp.cupiditys.lol" target="_blank" rel="noopener noreferrer" class="action-btn text-white font-bold py-3 px-4 rounded-lg w-full text-center mt-4">Acessar</a>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-content p-6 flex flex-col justify-between h-full">
                              <div>
                                <div class="text-3xl mb-4"><i class="fas fa-calculator"></i></div>
                                <h3 class="text-2xl font-bold mb-2">MATIFIC</h3>
                                <p class="text-muted mb-4">Acesso a recursos avançados do Matific.</p>
                              </div>
                              <a href="https://matific.cupiditys.lol" target="_blank" rel="noopener noreferrer" class="action-btn text-white font-bold py-3 px-4 rounded-lg w-full text-center mt-4">Acessar</a>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-content p-6 flex flex-col justify-between h-full">
                              <div>
                                <div class="text-3xl mb-4"><i class="fas fa-pen-nib"></i></div>
                                <h3 class="text-2xl font-bold mb-2">REDAÇÃO SALA DO FUTURO</h3>
                                <p class="text-muted mb-4">Recurso para ajudar na criação de redações.</p>
                              </div>
                              <a href="https://redacao.cupiditys.lol/" target="_blank" rel="noopener noreferrer" class="action-btn text-white font-bold py-3 px-4 rounded-lg w-full text-center mt-4">Acessar</a>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-content p-6 flex flex-col justify-between h-full">
                              <div>
                                <div class="text-3xl mb-4"><i class="fas fa-microphone"></i></div>
                                <h3 class="text-2xl font-bold mb-2">SPEAK</h3>
                                <p class="text-muted mb-4">Melhore suas habilidades de fala com esta ferramenta.</p>
                              </div>
                              <a href="https://speakify.cupiditys.lol" target="_blank" rel="noopener noreferrer" class="action-btn text-white font-bold py-3 px-4 rounded-lg w-full text-center mt-4">Instalar</a>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-content p-6 flex flex-col justify-between h-full">
                              <div>
                                <div class="text-3xl mb-4"><i class="fas fa-tasks"></i></div>
                                <h3 class="text-2xl font-bold mb-2">TAREFA SALA DO FUTURO</h3>
                                <p class="text-muted mb-4">Ferramenta para auxiliar nas tarefas da Sala do Futuro.</p>
                              </div>
                              <a href="https://taskitos.cupiditys.lol/" target="_blank" rel="noopener noreferrer" class="action-btn text-white font-bold py-3 px-4 rounded-lg w-full text-center mt-4">Acessar</a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div id="noResultsMessage" class="hidden text-center glass-effect p-12 my-16 rounded-2xl">
                <i class="fas fa-ghost text-6xl text-primary-glow mb-6 animate-bounce"></i>
                <h3 class="text-3xl font-bold mb-2">Nenhum ninja por aqui!</h3>
                <p class="text-muted text-lg">Não encontramos nada com esse termo. Tente uma nova busca!</p>
            </div>
        </main>
    </div>
    <button id="backToTop" class="fixed bottom-[-100px] right-6 w-14 h-14 glass-effect rounded-full text-2xl z-50 opacity-0"><i class="fas fa-arrow-up"></i></button>
    <div id="copyMessage" class="fixed bottom-6 left-1/2 -translate-x-1/2 glass-effect py-3 px-6 text-lg opacity-0 -translate-y-10 z-[10000] rounded-xl">
      <i class="fas fa-check-circle text-green-400 mr-3"></i>Script copiado com sucesso!
    </div>
    <script src="lógica/script.js"></script>
</body>
</html>```

---

### Arquivo 2: `lógica/script.js` (Final, com notificação de cópia)

```javascript
/* =========================================================
   SCRIPT OTIMIZADO (v2.0) - PERFORMANCE E INTERATIVIDADE
   Versão estável sem lógica de senha.
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

        const rotateX = ((y - centerY) / centerY) * -6; // Inclinação vertical
        const rotateY = ((x - centerX) / centerX) * 6;  // Inclinação horizontal

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


  // --- 4. FUNCIONALIDADE DE BUSCA (OTIMIZADA COM DEBOUNCE) ---
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    const linksContainer = document.getElementById('linksContainer');
    const allCards = document.querySelectorAll('#linksContainer .card');
    const noResultsMessage = document.getElementById('noResultsMessage');

    const performSearch = () => {
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


  // --- 6. BOTÃO "VOLTAR AO TOPO" (OTIMIZADO COM THROTTLE) ---
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
