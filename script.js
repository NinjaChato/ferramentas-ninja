document.addEventListener('DOMContentLoaded', () => {
    // ===================================
    // INICIALIZAÇÃO E EFEITOS VISUAIS
    // ===================================
    // Inicializa Particles.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": { "number": { "value": 60, "density": { "enable": true, "value_area": 800 } }, "color": { "value": ["#a855f7", "#ec4899", "#3b82f6", "#22c55e"] }, "shape": { "type": "circle" }, "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } }, "size": { "value": 3, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.1, "width": 1 }, "move": { "enable": true, "speed": 1, "direction": "none", "random": true, "straight": false, "out_mode": "out" } },
            "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "bubble" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }, "modes": { "bubble": { "distance": 250, "size": 4, "duration": 2, "opacity": 0.8 }, "push": { "particles_nb": 4 } } },
            "retina_detect": true
        });
    }

    // Animação de carregamento
    const loader = document.getElementById('loader');
    const animatedElements = document.querySelectorAll('.fade-in-up');
    window.onload = () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                animatedElements.forEach((el, index) => {
                    el.style.transitionDelay = `${index * 0.1}s`;
                    el.classList.add('loaded');
                });
                const searchInput = document.getElementById('searchInput');
                if (searchInput) searchInput.focus();
            }, 500);
        }, 500);
    };

    // ===================================
    // ELEMENTOS DO DOM E VARIÁVEIS
    // ===================================
    const searchInput = document.getElementById('searchInput');
    const linksContainer = document.getElementById('linksContainer');
    const noResultsMessage = document.getElementById('noResultsMessage');
    const backToTopBtn = document.getElementById('backToTop');
    const copyScriptBtns = document.querySelectorAll('.copy-script-btn');
    const copyMessage = document.getElementById('copyMessage');
    
    // Destaque do link de navegação ativo
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.category-btn');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else if (currentPage === '' && link.getAttribute('href') === 'index.html') {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // ===================================
    // FUNÇÕES E LÓGICAS
    // ===================================
    // Função Debounce para otimizar a pesquisa
    const debounce = (func, delay) => {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    };

    // Função de busca na página atual
    const filterContent = (searchTerm = '') => {
        if (!linksContainer) return;
        const cards = Array.from(linksContainer.querySelectorAll('.card'));
        let hasVisibleCards = false;
        
        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const searchMatch = searchTerm === '' || title.includes(searchTerm) || description.includes(searchTerm);
            
            if (searchMatch) {
                card.style.display = 'block';
                hasVisibleCards = true;
            } else {
                card.style.display = 'none';
            }
        });

        if (noResultsMessage) {
            noResultsMessage.classList.toggle('hidden', hasVisibleCards);
        }
    };

    // ===================================
    // EVENT LISTENERS
    // ===================================
    // Pesquisa
    if (searchInput) {
        searchInput.addEventListener('keyup', debounce((e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            filterContent(searchTerm);
        }, 300));
    }

    // Botão de voltar ao topo
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove('opacity-0', 'bottom-[-100px]');
                backToTopBtn.classList.add('opacity-100', 'bottom-6');
            } else {
                backToTopBtn.classList.remove('opacity-100', 'bottom-6');
                backToTopBtn.classList.add('opacity-0', 'bottom-[-100px]');
            }
        });
        backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0 }));
    }

    // Botões de copiar script
    if (copyScriptBtns.length > 0) {
        copyScriptBtns.forEach(button => {
            button.addEventListener('click', () => {
                const scriptToCopy = button.dataset.script;
                navigator.clipboard.writeText(scriptToCopy).then(() => {
                    if (copyMessage) {
                        copyMessage.classList.remove('opacity-0', '-translate-y-10');
                        copyMessage.classList.add('opacity-100', 'translate-y-0');
                        setTimeout(() => {
                            copyMessage.classList.remove('opacity-100', 'translate-y-0');
                            copyMessage.classList.add('opacity-0', '-translate-y-10');
                        }, 3000);
                    }
                }).catch(err => console.error('Falha ao copiar: ', err));
            });
        });
    }

    // Efeito de luz nos cards
    const allCards = document.querySelectorAll('.card');
    if (allCards.length > 0) {
        allCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--spotlight-x', `${x}px`);
                card.style.setProperty('--spotlight-y', `${y}px`);
            });
        });
    }
});
