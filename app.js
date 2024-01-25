let intentos = 1;
const numeroMaximo = 10;
let listaNumerosSorteados = [];
let numeroSecreto = generarNumeroSecreto();

function condicionesIniciales() {
  asignarTextoElemento("h1", "Juego del número secreto");
  asignarTextoElemento("p", `Indica un número del 1 al ${numeroMaximo}`);
  intentos = 1;
}

const limpiarCaja = () =>
  (document.querySelector("#valorUsuario").value = undefined);

function reiniciarJuego() {
  iniciarJuego();
  numeroSecreto = generarNumeroSecreto();
}

function iniciarJuego() {
  limpiarCaja();
  condicionesIniciales();
  document.querySelector("#reiniciar").setAttribute("disabled", "true");
  document.querySelector("#resetear").setAttribute("disabled", "true");
}

const asignarTextoElemento = (elemento, texto) =>
  (document.querySelector(elemento).innerHTML = texto);

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

function generarNumeroSecreto() {
  let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

  if (listaNumerosSorteados.length === numeroMaximo) {
    asignarTextoElemento("p", "Ya se sortearon todos los números posibles");
    document.getElementById("iniciar").setAttribute("disabled","true");
    document.getElementById("resetear").removeAttribute('disabled');
  } else {
    if (listaNumerosSorteados.includes(numeroGenerado)) {
      return generarNumeroSecreto();
    } else {
      listaNumerosSorteados.push(numeroGenerado);
      console.info(listaNumerosSorteados);
      return numeroGenerado;
    }
  }
}

function resetearJuego() {
  listaNumerosSorteados = [];
  reiniciarJuego();
  document.querySelector("#iniciar").removeAttribute("disabled");
}

iniciarJuego();
