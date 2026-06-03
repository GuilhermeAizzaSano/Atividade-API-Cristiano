// Constantes para a URL base e chave do cache
const URL_BASE_API = "https://deckofcardsapi.com/api/deck";
const CHAVE_CACHE = "dados_deck";
const DURACAO_CACHE_MS = 5 * 60 * 1000; // 5 minutos

// Função para criar um novo deck
async function criar_deck() {
  try {
    const resposta = await fetch(`${URL_BASE_API}/new/shuffle/?deck_count=1`);
    const dados = await resposta.json();
    if (!dados.success) throw new Error('Erro ao criar baralho');
    return dados.deck_id;
  } catch (erro) {
    console.error('Erro ao criar deck:', erro);
    throw erro;
  }
}

// Função para buscar as cartas do deck
async function buscar_cartas(deck_id) {
  try {
    const resposta = await fetch(`${URL_BASE_API}/${deck_id}/draw/?count=52`);
    const dados = await resposta.json();
    if (!dados.success || !Array.isArray(dados.cards)) throw new Error('Dados inválidos');
    return dados.cards;
  } catch (erro) {
    console.error('Erro ao buscar cartas:', erro);
    throw erro;
  }
}

// Função para salvar dados no localStorage
function salvar_cache(dados) {
  const dados_cache = {
    timestamp: Date.now(),
    dados,
  };
  localStorage.setItem(CHAVE_CACHE, JSON.stringify(dados_cache));
}

// Função para carregar dados do cache
function carregar_cache() {
  const cache = localStorage.getItem(CHAVE_CACHE);
  if (!cache) return null;

  try {
    const parseado = JSON.parse(cache);
    if (Date.now() - parseado.timestamp > DURACAO_CACHE_MS) {
      localStorage.removeItem(CHAVE_CACHE);
      return null;
    }
    return parseado.dados;
  } catch (erro) {
    console.error('Erro ao ler cache:', erro);
    localStorage.removeItem(CHAVE_CACHE);
    return null;
  }
}

export { criar_deck, buscar_cartas, salvar_cache, carregar_cache };
