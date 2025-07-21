document.addEventListener('DOMContentLoaded', () => {
  // Elementos do login
  const loginOverlay = document.getElementById('loginOverlay');
  const passwordInput = document.getElementById('passwordInput');
  const loginButton = document.getElementById('loginButton');
  const loginBtnText = document.getElementById('loginBtnText');
  const loginSpinner = document.getElementById('loginSpinner');
  const errorMessage = document.getElementById('errorMessage');
  const togglePassword = document.getElementById('togglePassword');
  const mainContainer = document.getElementById('mainContainer');
  const noSavePasswordMessage = document.getElementById('noSavePasswordMessage');
  const dismissNoSavePasswordBtn = document.getElementById('dismissNoSavePassword');

  // Hash SHA-256 da senha
  const correctPasswordHash = "1c704a8630b9fcf5f3a2e4460df609f78537d6bd05b2342ff2b68f0827b782d3";

  // Inicialmente, assume que a tela de login deve ser visível e o scroll desabilitado
  loginOverlay.classList.remove('hidden');
  mainContainer.classList.remove('visible');
  document.body.classList.add('no-scroll');
  document.documentElement.classList.add('no-scroll');
  passwordInput.focus();

  // Manipulação do tipo de input para evitar salvamento de senha
  passwordInput.addEventListener('focus', () => {
    passwordInput.setAttribute('type', 'password');
  });

  passwordInput.addEventListener('blur', () => {
    if (passwordInput.value === '') {
      passwordInput.setAttribute('type', 'text');
    }
  });

  // Função para tentar o login
  async function tryLogin() {
    const password = passwordInput.value;
    const passwordHash = CryptoJS.SHA256(password).toString();

    // Mostrar spinner e desabilitar botão
    loginBtnText.classList.add('hidden');
    loginSpinner.classList.remove('hidden');
    loginButton.disabled = true;

    // Simular um pequeno atraso para a animação do spinner (opcional, para UX)
    await new Promise(resolve => setTimeout(resolve, 800));

    if (passwordHash === correctPasswordHash) {
      passwordInput.value = ''; // Limpa o campo de senha após o login
      passwordInput.setAttribute('type', 'text'); // Volta para text após login

      loginOverlay.classList.add('hidden');
      mainContainer.classList.add('visible');
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
      initMainContent();

      // Mostrar mensagem para não salvar a senha
      noSavePasswordMessage.classList.add('visible');
      // Oculta a mensagem após 7 segundos, ou pode ser fechada pelo botão
      setTimeout(() => {
        noSavePasswordMessage.classList.remove('visible');
      }, 7000);

    } else {
      showError("Senha incorreta! Tente novamente.");
      passwordInput.value = '';
      passwordInput.setAttribute('type', 'text'); // Volta para text após erro
      passwordInput.focus();
    }

    // Esconder spinner e reabilitar botão
    loginBtnText.classList.remove('hidden');
    loginSpinner.classList.add('hidden');
    loginButton.disabled = false;
  }

  // Função para mostrar mensagem de erro
  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('visible');
    void errorMessage.offsetWidth; // Força reflow para garantir a transição
    setTimeout(() => {
      errorMessage.classList.remove('visible');
    }, 3000);
  }

  // Event listeners para o login
  document.querySelector('.login-box form').addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário
    tryLogin();
  });

  // Alternar visibilidade da senha
  togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.querySelector('i').classList.toggle('fa-eye');
    togglePassword.querySelector('i').classList.toggle('fa-eye-slash');
  });

  // Event listener para o botão de fechar a mensagem de "não salvar senha"
  dismissNoSavePasswordBtn.addEventListener('click', () => {
    noSavePasswordMessage.classList.remove('visible');
  });

  // Função para inicializar o conteúdo principal (após login)
  function initMainContent() {
    const searchInput = document.getElementById('searchInput');
    const linksContainer = document.getElementById('linksContainer');
    const cards = linksContainer.querySelectorAll('.card');
    const noResultsMessage = document.getElementById('noResultsMessage');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const backToTopBtn = document.getElementById('backToTop');
    const copyScriptBtns = document.querySelectorAll('.copy-script-btn');
    const copyMessage = document.getElementById('copyMessage');

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
          document.querySelector('.header-glass').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Função para filtrar conteúdo
    function filterContent(category, searchTerm = '') {
      let anyCardVisible = false;
      cards.forEach(card => {
        // Encontra a div da seção pai (ex: .jogos-pc, .jogos-navegador)
        const sectionDiv = card.closest('.jogos-pc, .jogos-navegador, .hacks, .ferramentas');

        // Se não encontrar uma seção pai com essas classes, algo está errado na estrutura HTML ou o card não deveria ser filtrado por categoria.
        // Para este caso, vamos assumir que todo card tem uma seção pai relevante.
        if (!sectionDiv) {
          card.style.display = 'none'; // Oculta se não estiver em uma seção categorizada
          return; // Pula para o próximo card
        }
        const sectionCategoryClass = sectionDiv.classList[0]; // Pega a primeira classe da seção, que é a categoria
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const cardCategoryMatch = category === 'todos' || sectionCategoryClass === category;
        const searchMatch = searchTerm === '' || title.includes(searchTerm) || description.includes(searchTerm);
        if (cardCategoryMatch && searchMatch) {
          card.style.display = 'flex'; /* Exibe o card */
          anyCardVisible = true;
        } else {
          card.style.display = 'none'; /* Oculta o card e remove do fluxo */
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
        void noResultsMessage.offsetWidth;
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

    // Filtro inicial
    filterContent('todos');

    // Focar no campo de pesquisa após login (se já não estiver focado)
    setTimeout(() => {
      searchInput.focus();
    }, 500);
  }
});
