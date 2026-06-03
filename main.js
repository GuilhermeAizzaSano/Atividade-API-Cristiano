<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Deck de Cartas - Busca</title>
  <link rel="stylesheet" href="./css/estilo.css">
</head>
<body>

  <div class="container">
    <h1>Buscar Cartas no Baralho</h1>

    <input type="text" id="campo_busca" placeholder="Digite para buscar uma carta...">
    <div id="aviso"></div>
    <div id="lista_cartas"></div>

    <div class="paginacao">
      <button id="anterior">Anterior</button>
      <span id="info_pagina"></span>
      <button id="proxima">Próxima</button>
    </div>
  </div>

  <script type="module" src="./js/main.js"></script>
</body>
</html>
