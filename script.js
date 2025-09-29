/*
 * ========================================
 * PORTFOLIO PESSOAL - JAVASCRIPT
 * ========================================
 * Este arquivo contém toda a funcionalidade interativa do portfólio,
 * incluindo navegação suave, animações e carrosséis de projetos.
 */

// ========================================
// NAVEGAÇÃO SUAVE ENTRE SEÇÕES
// ========================================

// Aguarda o carregamento completo da página antes de executar
document.addEventListener('DOMContentLoaded', function() {
  // Pega todos os links do menu de navegação
  const menuLinks = document.querySelectorAll('.nav-link');
  
  // Para cada link do menu, adiciona a funcionalidade de scroll suave
  menuLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      // Impede que o link funcione da forma tradicional (com "pulo")
      event.preventDefault();
      
      // Descobre qual seção o usuário quer ver (remove o # do href)
      const sectionId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(sectionId);
      
      // Faz o scroll suave até a seção desejada
      if (targetSection) {
        targetSection.scrollIntoView({ 
          behavior: 'smooth',    // Animação suave
          block: 'start'         // Alinha no topo da seção
        });
      }
    });
  });
});

// ========================================
// HEADER QUE ESCONDE/APARECE NO SCROLL
// ========================================

// Variáveis para controlar o comportamento do header
let ultimaPosicaoScroll = 0;
const headerElement = document.querySelector('.header');

// Monitora quando o usuário faz scroll na página
window.addEventListener('scroll', () => {
  // Pega a posição atual do scroll
  const posicaoAtualScroll = window.pageYOffset || document.documentElement.scrollTop;

  // Se o usuário está descendo a página, esconde o header
  if (posicaoAtualScroll > ultimaPosicaoScroll) {
    headerElement.style.transform = 'translateY(-100%)';
  } 
  // Se está subindo, mostra o header novamente
  else {
    headerElement.style.transform = 'translateY(0)';
  }

  // Atualiza a posição para a próxima verificação
  ultimaPosicaoScroll = Math.max(posicaoAtualScroll, 0);
});

// ========================================
// ANIMAÇÃO DAS LETRAS DO TÍTULO PRINCIPAL
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Pega todas as letras que foram separadas no HTML
    const letrasAnimadas = document.querySelectorAll('.letter');
    
    // Para cada letra, configura a animação
    letrasAnimadas.forEach((letra, posicao) => {
        // Estado inicial: invisível e um pouco abaixo
        letra.style.opacity = '0';
        letra.style.transform = 'translateY(20px)';
        letra.style.transition = 'all 0.5s ease';
        
        // Animação de entrada: cada letra aparece com um pequeno delay
        setTimeout(() => {
            letra.style.opacity = '1';
            letra.style.transform = 'translateY(0)';
        }, posicao * 100 + 1000); // Delay progressivo + 1 segundo inicial
        
        // Efeito quando o mouse passa por cima da letra
        letra.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.1)';
            this.style.color = '#808080';
            this.style.textShadow = '0 5px 15px rgba(128, 128, 128, 0.5)';
        });
        
        // Volta ao normal quando o mouse sai
        letra.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.color = '#ffffff';
            this.style.textShadow = 'none';
        });
    });
});

// ========================================
// SISTEMA DE CARROSSEL PRINCIPAL (LEARNHUB)
// ========================================

// Variáveis globais para controlar o carrossel principal
let slideAtualIndex = 0;
const slidesCarrossel = document.querySelectorAll('.carousel-slide');
const indicadoresCarrossel = document.querySelectorAll('.indicator');

/**
 * Mostra um slide específico do carrossel principal
 * @param {number} indice - Índice do slide a ser mostrado
 */
function mostrarSlide(indice) {
    // Remove a classe 'active' de todos os slides e indicadores
    slidesCarrossel.forEach(slide => slide.classList.remove('active'));
    indicadoresCarrossel.forEach(indicador => indicador.classList.remove('active'));
    
    // Ativa o slide e indicador correspondente
    if (slidesCarrossel[indice]) {
        slidesCarrossel[indice].classList.add('active');
        indicadoresCarrossel[indice].classList.add('active');
    }
    
    slideAtualIndex = indice;
}

/**
 * Navega para o próximo ou anterior slide
 * @param {number} direcao - 1 para próximo, -1 para anterior
 */
function mudarSlide(direcao) {
    let novoIndice = slideAtualIndex + direcao;
    
    // Sistema de loop infinito
    if (novoIndice >= slidesCarrossel.length) {
        novoIndice = 0; // Volta para o primeiro
    } else if (novoIndice < 0) {
        novoIndice = slidesCarrossel.length - 1; // Vai para o último
    }
    
    mostrarSlide(novoIndice);
}

/**
 * Vai para um slide específico (usado pelos indicadores)
 * @param {number} indice - Índice do slide (baseado em 1 no HTML)
 */
function slideEspecifico(indice) {
    mostrarSlide(indice - 1); // Converte de base-1 para base-0
}

/**
 * Inicia a reprodução automática do carrossel
 */
function iniciarAutoPlay() {
    setInterval(() => {
        mudarSlide(1); // Avança automaticamente
    }, 5000); // Troca a cada 5 segundos
}

// Inicializa o carrossel principal quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Só inicializa se existirem slides na página
    if (slidesCarrossel.length > 0) {
        mostrarSlide(0); // Começa no primeiro slide
        iniciarAutoPlay(); // Ativa a troca automática
    }
});

// ========================================
// CARROSSEL DO PROJETO LEARNHUB
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    let slideAtualLearnHub = 0;
    const imagensLearnHub = document.querySelectorAll('#learnhub-carousel .carousel-image');
    const pontosLearnHub = document.querySelectorAll('.carousel-dots .dot');
    
    /**
     * Exibe uma imagem específica do projeto LearnHub
     */
    function mostrarSlideLearnHub(indice) {
        // Desativa todas as imagens e pontos
        imagensLearnHub.forEach(img => img.classList.remove('active'));
        pontosLearnHub.forEach(ponto => ponto.classList.remove('active'));
        
        // Ativa a imagem e ponto correspondente
        if (imagensLearnHub[indice]) {
            imagensLearnHub[indice].classList.add('active');
        }
        if (pontosLearnHub[indice]) {
            pontosLearnHub[indice].classList.add('active');
        }
        
        slideAtualLearnHub = indice;
    }
    
    /**
     * Avança para a próxima imagem do LearnHub
     */
    function proximoSlideLearnHub() {
        const proximoIndice = (slideAtualLearnHub + 1) % imagensLearnHub.length;
        mostrarSlideLearnHub(proximoIndice);
    }
    
    // Adiciona clique nos pontos de navegação
    pontosLearnHub.forEach((ponto, indice) => {
        ponto.addEventListener('click', () => {
            mostrarSlideLearnHub(indice);
        });
    });
    
    // Troca automática das imagens (a cada 4 segundos)
    if (imagensLearnHub.length > 0) {
        setInterval(proximoSlideLearnHub, 4000);
        mostrarSlideLearnHub(0); // Inicia na primeira imagem
    }
});

// ========================================
// CARROSSEL DO PROJETO COFFEE LOVERS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    let slideAtualCoffee = 0;
    const imagensCoffee = document.querySelectorAll('#coffee-carousel .simple-carousel-image');
    const pontosCoffee = document.querySelectorAll('.simple-dots .simple-dot');
    
    /**
     * Exibe uma imagem específica do projeto Coffee Lovers
     */
    function mostrarSlideCoffee(indice) {
        imagensCoffee.forEach(img => img.classList.remove('active'));
        pontosCoffee.forEach(ponto => ponto.classList.remove('active'));
        
        if (imagensCoffee[indice]) {
            imagensCoffee[indice].classList.add('active');
        }
        if (pontosCoffee[indice]) {
            pontosCoffee[indice].classList.add('active');
        }
        
        slideAtualCoffee = indice;
    }
    
    /**
     * Avança para a próxima imagem do Coffee Lovers
     */
    function proximoSlideCoffee() {
        const proximoIndice = (slideAtualCoffee + 1) % imagensCoffee.length;
        mostrarSlideCoffee(proximoIndice);
    }
    
    // Navegação por clique nos pontos
    pontosCoffee.forEach((ponto, indice) => {
        ponto.addEventListener('click', () => {
            mostrarSlideCoffee(indice);
        });
    });
    
    // Troca automática mais lenta (a cada 5 segundos)
    if (imagensCoffee.length > 0) {
        setInterval(proximoSlideCoffee, 5000);
        mostrarSlideCoffee(0); // Inicia na primeira imagem
    }
});

// ========================================
// CARROSSEL DO PROJETO BARBEARIA WALLANS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    let slideAtualBarbearia = 0;
    const imagensBarbearia = document.querySelectorAll('#barbearia-carousel .simple-carousel-image');
    const pontosBarbearia = document.querySelectorAll('#barbearia-carousel + .simple-dots .simple-dot');
    
    /**
     * Exibe uma imagem específica do projeto Barbearia Wallans
     */
    function mostrarSlideBarbearia(indice) {
        imagensBarbearia.forEach(img => img.classList.remove('active'));
        pontosBarbearia.forEach(ponto => ponto.classList.remove('active'));
        
        if (imagensBarbearia[indice]) {
            imagensBarbearia[indice].classList.add('active');
        }
        if (pontosBarbearia[indice]) {
            pontosBarbearia[indice].classList.add('active');
        }
        
        slideAtualBarbearia = indice;
    }
    
    /**
     * Avança para a próxima imagem da Barbearia
     */
    function proximoSlideBarbearia() {
        const proximoIndice = (slideAtualBarbearia + 1) % imagensBarbearia.length;
        mostrarSlideBarbearia(proximoIndice);
    }
    
    // Navegação por clique nos pontos
    pontosBarbearia.forEach((ponto, indice) => {
        ponto.addEventListener('click', () => {
            mostrarSlideBarbearia(indice);
        });
    });
    
    // Troca automática com timing diferente (a cada 6 segundos)
    if (imagensBarbearia.length > 0) {
        setInterval(proximoSlideBarbearia, 6000);
        mostrarSlideBarbearia(0); // Inicia na primeira imagem
    }
});

/*
 * ========================================
 * FIM DO ARQUIVO
 * ========================================
 * Todas as funcionalidades do portfólio estão implementadas acima.
 * O código está organizado por seções para facilitar manutenção.
 */
