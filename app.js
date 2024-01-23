//Manipulación del DOM (Document Object Model)
let intentos = 1;
const numeroMaximo = 10;
const listaNumerosSorteados = [];
let numeroSecreto = generarNumeroSecreto();

const asignarTextoElemento = (elemento, texto) =>
  (document.querySelector(elemento).innerHTML = texto);

const limpiarCaja = () =>
  (document.querySelector("#valorUsuario").value = undefined);

const verificarIntento = () => {
  const numeroDeUsuario = parseInt(
    document.getElementById("valorUsuario").value
  );

  if (numeroSecreto === numeroDeUsuario) {
    asignarTextoElemento(
      "p",
      `¡Genial, Adivinaste el número usando ${intentos} ${
        intentos > 1 ? "intentos" : "intento"
      }!`
    );
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    asignarTextoElemento(
      "p",
      `El numero secreto es ${
        numeroDeUsuario > numeroSecreto ? "menor" : "mayor"
      }`
    );
    limpiarCaja();
    intentos++;
  }
};

//recursividad ctrl + F
function generarNumeroSecreto() {
  let numeroGenerado = Math.floor(Math.random() * 10) + 1;
  
  if (listaNumerosSorteados.length === numeroMaximo) {
    asignarTextoElemento('p','Ya se sortearon todos los números posibles');
  } else {
    if (listaNumerosSorteados.includes(numeroGenerado)) {
      return generarNumeroSecreto();
    } else {
      listaNumerosSorteados.push(numeroGenerado);
      console.info(listaNumerosSorteados)
      return numeroGenerado;
    }
  }
}

function condicionesIniciales() {
  asignarTextoElemento("h1", "Juego del número secreto");
  asignarTextoElemento("p", `Indica un número del 1 al ${numeroMaximo}`);
  numeroSecreto = generarNumeroSecreto();
  intentos = 1;
}

function reiniciarJuego() {
  limpiarCaja();
  condicionesIniciales();
  document.querySelector("#reiniciar").setAttribute("disabled", "true");
}

reiniciarJuego();
