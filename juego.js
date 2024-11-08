let anchoCanvas = 2000;
let altoCanvas = 400;

let jugadorX = 15;
let jugadorY;
let anchoRaqueta = anchoCanvas / 50
let altoRaqueta = 90;

let computadoraX = anchoCanvas - 25;
let computadoraY;

let pelotaX, pelotaY;
let diametroPelota = 20;
let velocidadPelotaX = 10;
let velocidadPelotaY = 10;
let anguloPelota = 0;

let grosorMarco = 10;

let jugadorScore = 0;
let computadoraScore = 0;

let fondo;
let barraJugador;
let barraComputadora;
let bola;
let sonidoRebote;
let sonidoGol;

function preload() {
  fondo = loadImage("./assets/juego/fondo1.png");
  barraJugador = loadImage("./assets/juego/barra1.png");
  barraComputadora = loadImage("./assets/juego/barra2.png");
  bola = loadImage("./assets/juego/bola.png");
  sonidoRebote = loadSound("./assets/juego/bounce.wav" , () => sonidoRebote.setVolume(0.2));
  sonidoGol = loadSound("./assets/juego/jingle_win_synth.wav" , () => sonidoGol.setVolume(0.2));
}

function setup() {
  let canvas = createCanvas(0, 0);
    canvas.parent('juego');
    
}
let canvas;
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("startButton").click();
});


function draw() {
  background(fondo);
  dibujarMarcos();
  dibujarRaquetas();
  dibujarPelota();
  mostrarPuntaje();
  moverPelota();
  moverComputadora();
  verificarColisiones();
}


function startGame() {
  // Crear el canvas dentro del contenedor con id 'juego'
  let canvas = createCanvas(anchoCanvas, altoCanvas);
  canvas.parent("juego"); // Asignamos el canvas al div con id 'juego'
  jugadorY = height / 2 - altoRaqueta / 2;
  computadoraY = height / 2 - altoRaqueta / 2;
  resetPelota();
  loop();
}
const demoPong = document.getElementById("startButton");
let isGameRunning = false;

demoPong.addEventListener("click", function() {
    if (demoPong.textContent === "Ver Demo") {
        startGame(); // Llamamos la función que crea el canvas y empieza el juego
        demoPong.textContent = "Cerrar Demo";
        isGameRunning = true;
    } else {
        demoPong.textContent = "Ver Demo";
        // Detenemos el juego si está corriendo
        if (isGameRunning) {
            let canvas = document.querySelector("canvas");
            if (canvas) {
                canvas.remove(); // Eliminamos el canvas
            }
            isGameRunning = false;
            // Detenemos el ciclo de animación y sonidos
            noLoop(); // Detiene la ejecución del ciclo draw
            sonidoRebote.stop(); // Detiene el sonido de rebote
            sonidoGol.stop(); // Detiene el sonido de gol
        }
    }
});

function dibujarMarcos() {
  fill(color("#2B3FD6"));
  rect(0, 0, width, grosorMarco); // Marco superior
  rect(0, height - grosorMarco, width, grosorMarco); // Marco inferior
}

function dibujarRaquetas() {
  image(barraJugador, jugadorX, jugadorY, anchoRaqueta, altoRaqueta);
  image(
    barraComputadora,
    computadoraX,
    computadoraY,
    anchoRaqueta,
    altoRaqueta
  );
}

function dibujarPelota() {
  push();
  translate(pelotaX, pelotaY);
  rotate(anguloPelota);
  imageMode(CENTER);
  image(bola, 0, 0, diametroPelota, diametroPelota);
  pop();
}

function mostrarPuntaje() {
  textSize(48);
  textAlign(CENTER, CENTER);
  fill(color("#2B3FD6"));
  text(jugadorScore, width / 4, grosorMarco * 3);
  text(computadoraScore, (3 * width) / 4, grosorMarco * 3);
}

function moverPelota() {
  pelotaX += velocidadPelotaX;
  pelotaY += velocidadPelotaY;

  // Ajustar el ángulo de la pelota en función de su velocidad
  let velocidadTotal = sqrt(
    velocidadPelotaX * velocidadPelotaX + velocidadPelotaY * velocidadPelotaY
  );
  anguloPelota += velocidadTotal * 0.05;

  // Colisión con el marco superior e inferior
  if (
    pelotaY - diametroPelota / 2 < grosorMarco ||
    pelotaY + diametroPelota / 2 > height - grosorMarco
  ) {
    velocidadPelotaY *= -1;
  }
}

function moverComputadora() {
  if (pelotaY > computadoraY + altoRaqueta / 2) {
    computadoraY += 4;
  } else if (pelotaY < computadoraY + altoRaqueta / 2) {
    computadoraY -= 4;
  }
  computadoraY = constrain(
    computadoraY,
    grosorMarco,
    height - grosorMarco - altoRaqueta
  );
}

function verificarColisiones() {
  // Colisión con la raqueta del jugador
  if (
    pelotaX - diametroPelota / 2 < jugadorX + anchoRaqueta &&
    pelotaY > jugadorY &&
    pelotaY < jugadorY + altoRaqueta
  ) {
    let puntoImpacto = pelotaY - (jugadorY + altoRaqueta / 2);
    let factorAngulo = ((puntoImpacto / (altoRaqueta / 2)) * PI) / 3; // Ángulo máximo de 60 grados
    velocidadPelotaY = 10 * sin(factorAngulo);
    velocidadPelotaX *= -1;
    sonidoRebote.play(); // Reproducir sonido de rebote
  }

  // Colisión con la raqueta de la computadora
  if (
    pelotaX + diametroPelota / 2 > computadoraX &&
    pelotaY > computadoraY &&
    pelotaY < computadoraY + altoRaqueta
  ) {
    let puntoImpacto = pelotaY - (computadoraY + altoRaqueta / 2);
    let factorAngulo = ((puntoImpacto / (altoRaqueta / 2)) * PI) / 3; // Ángulo máximo de 60 grados
    velocidadPelotaY = 10 * sin(factorAngulo);
    velocidadPelotaX *= -1;
    sonidoRebote.play(); // Reproducir sonido de rebote
  }

  // Colisión con los bordes izquierdo y derecho (anotación y reinicio)
  if (pelotaX < 0) {
    computadoraScore++;
    sonidoGol.play(); // Reproducir sonido de gol
    narrarMarcador(); // Narrar marcador
    resetPelota();
  } else if (pelotaX > width) {
    jugadorScore++;
    sonidoGol.play(); // Reproducir sonido de gol
    narrarMarcador(); // Narrar marcador
    resetPelota();
  }
}

function narrarMarcador() {
  let narrador = new SpeechSynthesisUtterance(
  `El marcador es ${jugadorScore} a ${computadoraScore}`
  );
  window.speechSynthesis.speak(narrador);
}

function resetPelota() {
  pelotaX = width / 2;
  pelotaY = height / 2;
  velocidadPelotaX = 5 * (Math.random() > 0.5 ? 1 : -1);
  velocidadPelotaY = 5 * (Math.random() > 0.5 ? 1 : -1);
  anguloPelota = 0;
}

function keyPressed() {
  if (key === "w" || key === "W") {
    jugadorY -= 20;
  } else if (key === "s" || key === "S") {
    jugadorY += 20;
  }
  jugadorY = constrain(
    jugadorY,
    grosorMarco,
    height - grosorMarco - altoRaqueta
  );
}

function touchStarted() {
  // Obtener la posición del toque en el eje Y
  let touchPosY = mouseY;
  
  // Verificar si el toque está en la mitad superior o inferior del canvas
  if (touchPosY < height / 2) {
    // Si está en la mitad superior, mover la raqueta hacia arriba
    jugadorY -= 10;
  } else {
    // Si está en la mitad inferior, mover la raqueta hacia abajo
    jugadorY += 10;
  }
  
  // Asegurarse de que la raqueta no se salga del canvas
  jugadorY = constrain(jugadorY, grosorMarco, height - grosorMarco - altoRaqueta);
  
}
