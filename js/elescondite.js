// VELAR — elescondite.js

// =====================================================
// CONFIGURACIÓN DE NIVELES
// =====================================================
// Más adelante vas a completar:
// - imagenA
// - imagenB
// - diferencias
//
// diferencias:
// [
//   { x: 15, y: 22 },
//   { x: 40, y: 55 },
//   ...
// ]
//
// x e y son porcentajes sobre la imagen.
// Debe haber 7 diferencias por nivel.
// =====================================================

const NIVELES = {
  facil: {
    
    imagenA: 'assets/img/escondite-facil-a.jpg',
    imagenB: 'assets/img/escondite-facil-b.jpg',

    diferencias: [
        { x: 9,  y: 90 }, // baldosas rosas abajo izquierda
        { x: 66, y: 31 }, // hoja larga de la planta
        { x: 51, y: 60 }, // maceta amarilla / marrón
        { x: 54, y: 70 }, // revistas sobre la mesa
        { x: 79, y: 57 }, // asiento de la silla roja
        { x: 23, y: 74 }, // respaldo silla roja
        { x: 22, y: 27 }  // manija del auto
    ],

    textoModal:
      'Observar es una de las herramientas más importantes del diseño. <br><br>Muchas veces las diferencias no están ocultas: simplemente todavía <em>no fueron vistas</em>. <br>El contraste permite destacar elementos y dirigir la atención. <br>No todo se mira de la misma manera: el tamaño, la posición y el peso visual ayudan a establecer distintos <strong>niveles de lectura</strong>.',

    asideModal:
      'Diseñar también implica detectar detalles que suelen pasar desapercibidos.',
  },

  intermedio: {
    imagenA: 'assets/img/escondite-intermedio-a.jpg',
    imagenB: 'assets/img/escondite-intermedio-b.jpg',
    
    diferencias: [
        { x: 35, y: 75 }, // rueda trasera bici
        /*{ x: 47, y: 75 }, // rueda delantera bici
        */{ x: 44, y: 56 }, // shorts
        { x: 96, y: 49 }, // auto extra derecha
        { x: 8,  y: 32 }, // colectivo violeta
        { x: 22, y: 49 }, // raya gris senda peatonal
        { x: 88, y: 9 }, // reloj negro
        { x: 29, y: 26 }, // palabra "observar"
    ],

    textoModal:
      'Cuando observamos una imagen no recorremos todos sus elementos <em>al mismo tiempo</em>. <br><br>La <strong>jerarquía visual</strong> organiza la información y guía nuestra mirada a través de tamaños, posiciones, contrastes y relaciones entre los elementos. <br>Detectar diferencias también implica comprender qué llama primero nuestra atención y qué queda en segundo plano. <br>Diseñar es construir recorridos visuales que ayuden a interpretar una imagen.',

    asideModal:
      'La mirada siempre sigue un recorrido, incluso cuando no somos conscientes de ello.',
  },

  dificil: {
    imagenA: 'assets/img/diferencias-dificil-a.png',
    imagenB: 'assets/img/diferencias-dificil-b.png',
    diferencias: [
      { x: 31, y: 16 }, // TAKE AWAY
      { x: 16, y: 53 }, // cinturón / llaves
      { x: 55, y: 10 }, // número 145
      { x: 55, y: 57 }, // termo
      { x: 66, y: 59 }, // tatuajes
      { x: 48, y: 94 }, // caja abajo
      { x: 78, y: 92 }  // perro
    ],


    textoModal:
      '<em>Ver no siempre significa percibir</em>. Nuestro cerebro completa información, agrupa formas y establece relaciones constantemente para interpretar lo que observa. <br><br> Por eso algunas diferencias permanecen ocultas: no porque sean invisibles, sino porque nuestra percepción las integra dentro de un mismo conjunto. Diseñar también consiste en comprender cómo las personas <strong>construyen sentido a partir de lo que ven</strong>.',

    asideModal:
      'La percepción no registra la realidad exactamente como es: la interpreta.',
  },
};

const TOTAL_DIFERENCIAS = 7;

document.addEventListener('DOMContentLoaded', () => {

// =====================================================
// ETAPAS
// =====================================================

const etapaIntro = document.querySelector('[data-etapa="intro"]');
const etapaNiveles = document.querySelector('[data-etapa="niveles"]');
const etapaJuego = document.querySelector('[data-etapa="juego"]');

// =====================================================
// BOTONES
// =====================================================

const btnDescubrirJuego = document.getElementById('btnDescubrirJuego');
const botonesNivel = document.querySelectorAll('.selector-niveles__btn');
const btnRevelar = document.querySelector('[data-boton-revelar]');

// =====================================================
// JUEGO
// =====================================================

const letrasNivel = document.querySelectorAll('[data-letra-nivel]');

const imagenA = document.getElementById('imagenA');
const imagenB = document.getElementById('imagenB');

const contenedorDiferenciasA =
document.querySelector('[data-diferencias="a"]');

const contenedorDiferenciasB =
document.querySelector('[data-diferencias="b"]');

const tiempoEl = document.querySelector('[data-tiempo]');

const contadorEl =
document.querySelector('[data-hallazgos-contador]');

const totalEl =
document.querySelector('[data-hallazgos-total]');

// =====================================================
// MODAL
// =====================================================

const modalOverlay =
document.querySelector('[data-modal-overlay]');

const modalTitulo =
document.querySelector('[data-modal-titulo]');

const modalTexto =
document.querySelector('[data-modal-texto]');

const modalAside =
document.querySelector('[data-modal-aside]');

const modalEncontradas =
document.querySelector('[data-modal-encontradas]');

const modalTotal =
document.querySelector('[data-modal-total]');

const btnModalCerrar =
document.querySelector('[data-modal-cerrar]');

const navInferior =
document.getElementById('navInferior');

// =====================================================
// ESTADO DEL JUEGO
// =====================================================

let nivelActual = null;

let encontradas = 0;

let segundos = 0;

let intervaloTiempo = null;

// -----------------------------------------------------
// GUARDA QUÉ DIFERENCIAS YA FUERON ENCONTRADAS
// Evita que la misma diferencia cuente dos veces
// (una en la imagen izquierda y otra en la derecha).
// -----------------------------------------------------

let diferenciasEncontradas = new Set();

totalEl.textContent = TOTAL_DIFERENCIAS;
modalTotal.textContent = TOTAL_DIFERENCIAS;

// =====================================================
// TIEMPO
// =====================================================

function formatearTiempo(s) {

const m =
  Math.floor(s / 60)
    .toString()
    .padStart(2, '0');

const r =
  (s % 60)
    .toString()
    .padStart(2, '0');

return `${m}:${r}`;
 

}

function iniciarTemporizador() {


detenerTemporizador();

segundos = 0;

tiempoEl.textContent =
  formatearTiempo(segundos);

intervaloTiempo = setInterval(() => {

  segundos++;

  tiempoEl.textContent =
    formatearTiempo(segundos);

}, 1000);
 

}

function detenerTemporizador() {


if (intervaloTiempo) {

  clearInterval(intervaloTiempo);

  intervaloTiempo = null;
}


}

// =====================================================
// DIFERENCIAS
// =====================================================

function crearPuntosDiferencia(
contenedor,
diferencias
) {

contenedor.innerHTML = '';

diferencias.forEach((punto, index) => {

  const btn = document.createElement('button');

  btn.type = 'button';

  btn.className = 'diferencia-punto';

  if (index === 0) {
      btn.classList.add('diferencia-punto-rueda');
    }

    if (index === 3) {
      btn.classList.add('diferencia-punto-colectivo');
    }

if (index === 2) {
      btn.classList.add('diferencia-punto-auto');
    }


  btn.style.top = `${punto.y}%`;
  btn.style.left = `${punto.x}%`;

  btn.dataset.encontrada = 'false';

  // misma diferencia en ambas imágenes

  btn.dataset.indice = index;

  btn.setAttribute(
    'aria-label',
    'Diferencia'
  );

  btn.addEventListener('click', () => {
    marcarDiferencia(btn);
  });

  contenedor.appendChild(btn);
});
 

}

function marcarDiferencia(btn) {

 
const indice = btn.dataset.indice;

// ------------------------------------------
// Ya fue encontrada antes
// ------------------------------------------

if (
  diferenciasEncontradas.has(indice)
) {
  return;
}

diferenciasEncontradas.add(indice);

btn.dataset.encontrada = 'true';

encontradas++;

contadorEl.textContent = encontradas;

// ------------------------------------------
// Si encontró las 7:
// abre modal automáticamente
// ------------------------------------------

if (
  encontradas >= TOTAL_DIFERENCIAS
) {

  detenerTemporizador();

  setTimeout(() => {

    abrirModalFinal();

  }, 400);
}
 

}

// =====================================================
// CARGAR NIVEL
// =====================================================

function cargarNivel(nivel) {

 
const datos = NIVELES[nivel];

if (!datos) return;

nivelActual = nivel;

encontradas = 0;

diferenciasEncontradas.clear();

contadorEl.textContent = encontradas;

imagenA.src = datos.imagenA;
imagenB.src = datos.imagenB;

crearPuntosDiferencia(
  contenedorDiferenciasA,
  datos.diferencias
);

crearPuntosDiferencia(
  contenedorDiferenciasB,
  datos.diferencias
);

letrasNivel.forEach((letra) => {

  letra.classList.toggle(
    'is-activo',
    letra.dataset.letraNivel === nivel
  );
});

botonesNivel.forEach((b) => {

  b.classList.toggle(
    'is-seleccionado',
    b.dataset.nivel === nivel
  );
});

etapaNiveles.hidden = true;
etapaJuego.hidden = false;

iniciarTemporizador();
 

}

// =====================================================
// MODAL FINAL
// =====================================================

function abrirModalFinal() {

 
detenerTemporizador();

const datos =
  NIVELES[nivelActual] || {};

/*modalTitulo.textContent =
  datos.tituloModal || '¡Buen ojo!';
*/

if (encontradas === 7) {
  modalTitulo.textContent = '¡BUEN OJO!';
}
else if (encontradas >= 5) {
  modalTitulo.textContent = 'CASI LO TENÉS';
}
else if (encontradas >= 3) {
  modalTitulo.textContent = 'MIRÁ OTRA VEZ';
}
else {
  modalTitulo.textContent = 'OBSERVÁ CON CALMA';
}

modalTexto.innerHTML =
  datos.textoModal || '';

modalAside.innerHTML =
  datos.asideModal || '';

modalEncontradas.textContent =
  encontradas;

modalOverlay.hidden = false;

navInferior.classList.add(
  'nav-oculto'
);

btnModalCerrar.focus();
 

}

function cerrarModalFinal() {

 
modalOverlay.hidden = true;

navInferior.classList.remove(
  'nav-oculto'
);

etapaJuego.hidden = true;

etapaNiveles.hidden = false;
 

}

// =====================================================
// EVENTOS
// =====================================================

btnDescubrirJuego.addEventListener(
'click',
() => {

 
  etapaIntro.hidden = true;

  etapaNiveles.hidden = false;
}
 

);

botonesNivel.forEach((boton) => {

 
boton.addEventListener(
  'click',
  () => {

    cargarNivel(
      boton.dataset.nivel
    );
  }
);
 

});

btnRevelar.addEventListener(
'click',
abrirModalFinal
);

btnModalCerrar.addEventListener(
'click',
cerrarModalFinal
);

modalOverlay.addEventListener(
'click',
(event) => {

 
  if (
    event.target === modalOverlay
  ) {
    cerrarModalFinal();
  }
}
 

);

document.addEventListener(
'keydown',
(event) => {

 
  if (
    event.key === 'Escape' &&
    !modalOverlay.hidden
  ) {
    cerrarModalFinal();
  }
}
 

);
});
