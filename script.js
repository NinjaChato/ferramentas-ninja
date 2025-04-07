// Cria partículas flutuantes
function createParticles() {
    const colors = ['rgba(138, 43, 226, 0.3)', 'rgba(148, 0, 211, 0.3)', 'rgba(75, 0, 130, 0.3)'];

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Posição e tamanho aleatórios
        const size = Math.random() * 10 + 5;
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        // Animação
        particle.style.animation = `float ${Math.random() * 5 + 5}s ease-in-out infinite`;

        document.body.appendChild(particle);
    }
}

// Funções de busca e filtro
function searchGames(section) {
    const searchTerm = document.getElementById(`search-${section}`).value.toLowerCase();
    const cards = document.querySelectorAll(`#${section}-games-container .card`);

    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const isVisible = title.includes(searchTerm) || description.includes(searchTerm);
        
        if (isVisible) {
            card.classList.remove('hidden-search');
        } else {
            card.classList.add('hidden-search');
        }
    });
}

function filterGames(section) {
    const filterValue = document.getElementById(`filter-${section}`).value;
    const cards = document.querySelectorAll(`#${section}-games-container .card`);

    cards.forEach(card => {
        const category = card.dataset.category;
        const isSearchHidden = card.classList.contains('hidden-search');
        const shouldShow = (filterValue === 'todos' || category === filterValue) && !isSearchHidden;
        
        if (shouldShow) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Scroll suave para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer para animações
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

document.querySelectorAll('.grid').forEach((el) => {
    observer.observe(el);
});

// Ativa links da navbar conforme scroll
window.addEventListener('scroll', () => {
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('.navbar a');
    
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        
        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                if (links.getAttribute('href') === '#' + id) {
                    links.classList.add('active');
                }
            });
        }
    });
});

// Botão voltar ao topo
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("backToTop").style.display = "block";
    } else {
        document.getElementById("backToTop").style.display = "none";
    }
};

document.getElementById("backToTop").addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Esconde tela de loading quando a página carrega
window.addEventListener('load', function() {
    document.getElementById('loading').style.display = 'none';
    
    // Adiciona categorias aos cards dinamicamente
    addCategoriesToCards();
    
    // Cria partículas
    createParticles();
});

// Função para adicionar categorias aos cards
function addCategoriesToCards() {
    // Jogos Web
    const webCategories = {
        "Ball Bang": "classico",
        "EmuLibrary": "emulador",
        "HTML Games": "html5",
        "Flash Games": "flash",
        "Games Site": "colecao",
        "UG17 Games Collection": "colecao"
    };
    
    // Jogos PC
    const pcCategories = {
        "Geometry Dash": "acao",
        "MotoGP 17": "corrida",
        "Dark Souls 3": "acao",
        "Diablo III": "rpg",
        "Diablo IV": "rpg",
        "Descenders": "corrida",
        "Outlast": "terror",
        "Letal Company": "terror",
        "Overcooked 2": "estrategia",
        "Need for Speed Heat": "corrida",
        "Euro Truck Simulator": "simulacao",
        "Euro Truck Simulator 2": "simulacao",
        "Microsoft Flight Simulator": "simulacao",
        "Internet Cafe Simulator": "simulacao"
    };
    
    // Jogos Mobile
    const mobileCategories = {
        "FNAF 1": "terror",
        "FNAF 2": "terror",
        "FNAF 3": "terror",
        "FNAF 4": "terror",
        "FNAF Sister Location": "terror",
        "FNAF 6: Pizzeria Simulator": "terror",
        "FNAF Ultimate Custom Night": "terror",
        "Naruto Ultimate Ninja Storm": "acao",
        "Cuphead": "aventura",
        "Terraria": "aventura",
        "Bloons TD 6": "estrategia",
        "Bully": "aventura",
        "GTA San Andreas": "acao",
        "Undertale": "rpg"
    };
    
    // Aplica categorias
    applyCategories('web', webCategories);
    applyCategories('pc', pcCategories);
    applyCategories('mobile', mobileCategories);
}

function applyCategories(section, categories) {
    const cards = document.querySelectorAll(`#${section}-games-container .card`);
    
    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.trim();
        if (categories[title]) {
            card.dataset.category = categories[title];
        }
    });
}
