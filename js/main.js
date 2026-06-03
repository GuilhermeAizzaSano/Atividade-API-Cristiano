import { criar_deck, buscar_cartas, salvar_cache, carregar_cache } from "./api.js";
import { debounce, criar_elemento } from "./utils.js";

// Selecionando elementos do HTML
const campo_busca = document.getElementById('campo_busca');
const lista_cartas = document.getElementById('lista_cartas');
const aviso = document.getElementById('aviso');
const botao_anterior = document.getElementById('anterior');
const botao_proxima = document.getElementById('proxima');
const info_pagina = document.getElementById('info_pagina');

// Variáveis de controle
let cartas = [];
let cartas_filtradas = [];
let pagina_atual = 1;
const tamanho_pagina = 5;

// Função de inicialização da aplicação
async function iniciar() {
  const cache = carregar_cache();
  if (cache) {
    aviso.textContent = "Dados carregados do cache.";
    cartas = cache;
    cartas_filtradas = [...cartas];
    renderizar();
  } else {
    try {
      aviso.textContent = "Carregando dados da API...";
      const deck_id = await criar_deck();
      const cartas_recebidas = await buscar_cartas(deck_id);
      salvar_cache(cartas_recebidas);
      cartas = cartas_recebidas;
      cartas_filtradas = [...cartas];
      aviso.textContent = "Dados carregados da API.";
      renderizar();
    } catch (erro) {
      aviso.textContent = "Erro ao carregar dados.";
    }
  }
}

// Função para renderizar as cartas na tela
function renderizar() {
  lista_cartas.innerHTML = '';

  const inicio = (pagina_atual - 1) * tamanho_pagina;
  const fim = inicio + tamanho_pagina;
  const cartas_para_mostrar = cartas_filtradas.slice(inicio, fim);

  cartas_para_mostrar.forEach(carta => {
    const imagem = criar_elemento('img', { src: carta.image, alt: carta.code, class: 'carta' });
    lista_cartas.appendChild(imagem);
  });

  info_pagina.textContent = `Página ${pagina_atual} de ${Math.ceil(cartas_filtradas.length / tamanho_pagina)}`;

  botao_anterior.disabled = pagina_atual === 1;
  botao_proxima.disabled = pagina_atual >= Math.ceil(cartas_filtradas.length / tamanho_pagina);
}

// Função para buscar cartas conforme a pesquisa do usuário
function buscar_cartas_por_texto(texto) {
  const texto_min = texto.toLowerCase();
  cartas_filtradas = cartas.filter(carta => 
    carta.value.toLowerCase().includes(texto_min) || 
    carta.suit.toLowerCase().includes(texto_min)
  );
  pagina_atual = 1;
  renderizar();
}

// Eventos
campo_busca.addEventListener('input', debounce((e) => {
  buscar_cartas_por_texto(e.target.value);
}));

botao_anterior.addEventListener('click', () => {
  if (pagina_atual > 1) {
    pagina_atual--;
    renderizar();
  }
});

botao_proxima.addEventListener('click', () => {
  if (pagina_atual < Math.ceil(cartas_filtradas.length / tamanho_pagina)) {
    pagina_atual++;
    renderizar();
  }
});

// Inicializa o app
iniciar();
