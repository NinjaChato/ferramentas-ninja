function createParticles() {
  const colors = ['rgba(138, 43, 226, 0.3)', 'rgba(148, 0, 211, 0.3)', 'rgba(75, 0, 130, 0.3)'];
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 10 + 5;
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}px`;
    particle.style.top = `${posY}px`;
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.animation = `float ${Math.random() * 5 + 5}s ease-in-out infinite`;
    document.body.appendChild(particle);
  }
}

function searchGames(section) {
  const searchTerm = document.getElementById(`search-${section}`).value.toLowerCase();
  const cards = document.querySelectorAll(`#${section}-games-container .card`);

  cards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    const description = card.querySelector('p').textContent.toLowerCase();
    const isVisible = title.includes(searchTerm) || description.includes(searchTerm);
    card.classList.toggle('hidden-search', !isVisible);
  });

  filterGames(section);
}

function filterGames(section) {
  const filterValue = document.getElementById(`filter-${section}`).value;
  const cards = document.querySelectorAll(`#${section}-games-container .card`);

  cards.forEach(card => {
    const category = card.dataset.category;
    const isHidden = card.classList.contains('hidden-search');
    const match = (filterValue === 'todos' || category === filterValue) && !isHidden;
    card.style.display = match ? 'flex' : 'none';
  });
}

document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
});

document.querySelectorAll('.grid').forEach(el => observer.observe(el));

window.addEventListener('scroll', () => {
  let sections = document.querySelectorAll('section');
  let navLinks = document.querySelectorAll('.navbar a');

  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
});

window.onscroll = function () {
  document.getElementById("backToTop").style.display = (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? "block" : "none";
};

document.getElementById("backToTop").addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('load', function () {
  document.getElementById('loading').style.display = 'none';
  addCategoriesToCards();
  createParticles();
});

function addCategoriesToCards() {
  const webCategories = {
    "Ball Bang": "classico",
    "EmuLibrary": "emulador",
    "HTML Games": "html5",
    "Flash Games": "flash",
    "Games Site": "colecao",
    "UG17 Games Collection": "colecao"
  };

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

  applyCategories('web', webCategories);
  applyCategories('pc', pcCategories);
  applyCategories('mobile', mobileCategories);
}

function applyCategories(section, categories) {
  const cards = document.querySelectorAll(`#${section}-games-container .card`);

  cards.forEach(card => {
    const title = card.querySelector('h3').textContent.trim();
    if (!card.dataset.category && categories[title]) {
      card.dataset.category = categories[title];
    }
  });
}
