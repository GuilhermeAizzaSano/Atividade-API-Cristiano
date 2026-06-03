# Busca de Cartas — Deck of Cards API

Aplicação web que consome a [Deck of Cards API](https://deckofcardsapi.com/) para buscar e
navegar por cartas de baralho, aplicando boas práticas no consumo de APIs — com destaque para
uma camada de **cache** que evita requisições repetidas.

## Sobre o projeto

Atividade de estudo focada em consumir uma API pública de forma eficiente. Em vez de bater na
API a cada interação ou recarga de página, os dados são buscados uma vez e reaproveitados de um
cache local por um intervalo de tempo, reduzindo chamadas desnecessárias e deixando a navegação
mais rápida.

## Funcionalidades

- **Busca de cartas** — campo de busca que filtra as cartas do baralho conforme você digita.
- **Listagem visual** — as cartas são exibidas em grade, com leve zoom ao passar o mouse.
- **Paginação** — navegação entre páginas de resultados (Anterior / Próxima), com indicação da
  página atual.
- **Cache de 5 minutos** — após a primeira consulta, os dados ficam armazenados localmente por
  5 minutos. Recarregar a página dentro desse período usa o cache, sem nova chamada à API.

## Como funciona o cache

1. Na primeira carga, a aplicação solicita os dados das cartas à Deck of Cards API.
2. A resposta é guardada localmente junto de um carimbo de tempo (timestamp).
3. Nas próximas cargas, antes de chamar a API, verifica-se a idade do cache:
   - **Com menos de 5 minutos** → os dados do cache são usados diretamente.
   - **Com 5 minutos ou mais** → a API é consultada de novo e o cache é atualizado.

Esse padrão (cache com expiração por tempo, ou *time-based invalidation*) é a ideia central da
atividade.

## Tecnologias

- **HTML5** — estrutura da página
- **CSS3** — estilização da grade de cartas e da paginação
- **JavaScript (ES Modules)** — consumo da API, cache, busca e paginação
- **Deck of Cards API** — fonte pública dos dados das cartas

## Como executar

Como o projeto usa **ES Modules** (`<script type="module">`), abrir o HTML direto pelo
`file://` não funciona — é preciso servir os arquivos por HTTP. Escolha uma das opções:

```bash
# Opção 1 — Python (já vem instalado em muitos sistemas)
python -m http.server 8000

# Opção 2 — Node.js
npx serve

# Opção 3 — extensão "Live Server" no VS Code
```

Depois, acesse `http://localhost:8000` (ou a porta indicada) no navegador.

## Possíveis melhorias

- Tratamento de erros de rede com feedback visual ao usuário.
- Indicador de carregamento durante as chamadas à API.
- Testes automatizados para a lógica de cache.
- Configuração do tempo de expiração do cache em um único ponto.

---

Projeto desenvolvido por [Guilherme Aizza Sano](https://github.com/GuilhermeAizzaSano) como
atividade de estudo sobre consumo de APIs.
