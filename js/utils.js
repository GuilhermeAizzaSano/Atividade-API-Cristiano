// Função debounce para evitar chamadas excessivas enquanto o usuário digita
export function debounce(funcao, atraso = 500) {
    let temporizador;
    return function (...args) {
      clearTimeout(temporizador);
      temporizador = setTimeout(() => funcao.apply(this, args), atraso);
    };
  }
  
  // Função para criar elementos HTML de forma mais prática
  export function criar_elemento(tag, atributos = {}, ...filhos) {
    const elemento = document.createElement(tag);
    for (const [atributo, valor] of Object.entries(atributos)) {
      if (atributo.startsWith('on') && typeof valor === 'function') {
        elemento.addEventListener(atributo.substring(2), valor);
      } else {
        elemento.setAttribute(atributo, valor);
      }
    }
    filhos.forEach(filho => {
      if (typeof filho === 'string') {
        elemento.appendChild(document.createTextNode(filho));
      } else if (filho) {
        elemento.appendChild(filho);
      }
    });
    return elemento;
  }
  