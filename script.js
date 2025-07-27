document.addEventListener('DOMContentLoaded', () => {
  // Elementos do DOM
  const searchInput = document.getElementById('searchInput');
  const linksContainer = document.getElementById('linksContainer');
  const cards = linksContainer.querySelectorAll('.card');
  const noResultsMessage = document.getElementById('noResultsMessage');
  const categoryBtns = document.querySelectorAll('.category-btn');
  const backToTopBtn = document.getElementById('backToTop');
  const copyScriptBtns = document.querySelectorAll('.copy-script-btn');
  const copyMessage = document.getElementById('copyMessage');
  const mainContainer = document.getElementById('mainContainer');
  // const insaneModeToggle = document.getElementById('insaneModeToggle'); // REMOVIDO: Modo Insano

  // Função debounce para otimizar a pesquisa
  const debounce = (func, delay) => {
    let timeout;
    return function(...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  };

  // Botão de voltar ao topo
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Filtro de categorias
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.dataset.category;
      filterContent(category, searchInput.value.toLowerCase());
      // Rolagem suave para a seção
      if (category !== 'todos') {
        const targetSection = document.querySelector(`.${category}`);
        if (targetSection) {
          const sectionTitle = targetSection.querySelector('.section-title');
          if (sectionTitle) {
            sectionTitle.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      } else {
        // Para "Todos", rola para o topo do cabeçalho
        const header = document.querySelector('.header-glass');
        if (header) { // Adicionar verificação para garantir que o elemento existe
          header.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Função para filtrar conteúdo
  function filterContent(category, searchTerm = '') {
    let anyCardVisible = false;
    cards.forEach(card => {
      const sectionDiv = card.closest('.jogos-pc, .jogos-navegador, .hacks, .ferramentas');

      if (!sectionDiv) {
        card.style.display = 'none';
        return;
      }
      const sectionCategoryClass = sectionDiv.classList[0];
      const title = card.querySelector('h3').textContent.toLowerCase();
      const description = card.querySelector('p').textContent.toLowerCase();
      const cardCategoryMatch = category === 'todos' || sectionCategoryClass === category;
      const searchMatch = searchTerm === '' || title.includes(searchTerm) || description.includes(searchTerm);

      if (cardCategoryMatch && searchMatch) {
        card.style.display = 'flex';
        anyCardVisible = true;
      } else {
        card.style.display = 'none';
      }
    });

    // Ajusta a exibição das seções (Jogos PC, Navegador, etc.)
    document.querySelectorAll('.jogos-pc, .jogos-navegador, .hacks, .ferramentas').forEach(section => {
      const sectionCards = section.querySelectorAll('.card');
      const visibleCardsInSection = Array.from(sectionCards).filter(c => c.style.display !== 'none');
      if (visibleCardsInSection.length === 0) {
        section.style.display = 'none';
      } else {
        section.style.display = 'block';
      }
    });

    if (anyCardVisible) {
      noResultsMessage.classList.remove('visible');
      noResultsMessage.classList.add('hidden');
    } else {
      noResultsMessage.classList.remove('hidden');
      void noResultsMessage.offsetWidth; // Força reflow para transição
      noResultsMessage.classList.add('visible');
    }
  }

  // Pesquisa com debounce
  searchInput.addEventListener('keyup', debounce((event) => {
    const searchTerm = event.target.value.toLowerCase();
    const activeCategory = document.querySelector('.category-btn.active').dataset.category;
    filterContent(activeCategory, searchTerm);
  }, 300));

  // Adiciona evento de clique para os botões de copiar script
  copyScriptBtns.forEach(button => {
    button.addEventListener('click', () => {
      const scriptToCopy = button.dataset.script;
      if (scriptToCopy) {
        const textarea = document.createElement('textarea');
        textarea.value = scriptToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          copyMessage.classList.add('visible');
          setTimeout(() => {
            copyMessage.classList.remove('visible');
          }, 3000);
        } catch (err) {
          console.error('Falha ao copiar o script: ', err);
        } finally {
          document.body.removeChild(textarea);
        }
      }
    });
  });

  // Efeito de luz nos cards ao mover o mouse
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--spotlight-x', `${x}px`);
      card.style.setProperty('--spotlight-y', `${y}px`);
    });
    // Adicionar listener para remover opacidade do spotlight quando o mouse sair
    card.addEventListener('mouseleave', () => {
        card.style.setProperty('--spotlight-x', '0'); // Resetar para evitar brilho residual
        card.style.setProperty('--spotlight-y', '0');
        // O CSS já lida com a transição de opacidade ao sair
    });
  });

  // REMOVIDO: Lógica para o Modo Insano

  // Filtro inicial ao carregar a página
  filterContent('todos');

  // O foco no campo de pesquisa foi movido para o script inline no index.html (window.onload)
  // para garantir que ele ocorra após o loader desaparecer e o conteúdo estar visível.
});
