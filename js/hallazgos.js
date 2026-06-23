// VELAR — hallazgos.js
// Datos de proyectos + apertura/cierre del modal.

const PROYECTOS = {
  'identidad-minujin': {
    titulo: 'Sistema de identidad visual',
    texto:
      'Sistema de identidad para un centro cultural inspirado en el universo experimental de Marta Minujín. Una propuesta visual flexible y en constante transformación, diseñada para acompañar la diversidad de actividades del espacio.',
    imagenes: [
      {
        src: 'assets/img/proyecto-minujin-01.png',
        alt: 'Sistema de identidad visual para centro cultural — lámina 1',
      },
      {
        src: 'assets/img/proyecto-minujin-02.png',
        alt: 'Sistema de identidad visual para centro cultural — lámina 2',
      },
    ],
  },
};

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.querySelector('[data-modal-overlay]');
  const modal = document.querySelector('[data-modal]');
  const modalTitulo = document.querySelector('[data-modal-titulo]');
  const modalTexto = document.querySelector('[data-modal-texto]');
  const modalGaleria = document.querySelector('[data-modal-galeria]');
  const btnCerrar = document.querySelector('[data-modal-cerrar]');
  const celdas = document.querySelectorAll('.grid-cell[data-proyecto]');

  if (!overlay || !modal) return;

  let ultimoDisparador = null;

  function llenarModal(proyecto) {
    modalTitulo.textContent = proyecto.titulo;
    modalTexto.textContent = proyecto.texto;
    modalGaleria.innerHTML = '';

    proyecto.imagenes.forEach((imagen) => {
      const img = document.createElement('img');
      img.src = imagen.src;
      img.alt = imagen.alt || '';
      modalGaleria.appendChild(img);
    });
  }

  function abrirModal(idProyecto, disparador) {
    const proyecto = PROYECTOS[idProyecto];
    if (!proyecto) return;

    llenarModal(proyecto);

    ultimoDisparador = disparador || null;

    overlay.hidden = false;
    document.body.classList.add('no-scroll');
    btnCerrar.focus();
  }

  function cerrarModal() {
    overlay.hidden = true;
    document.body.classList.remove('no-scroll');
    modalGaleria.innerHTML = '';

    if (ultimoDisparador) {
      ultimoDisparador.focus();
      ultimoDisparador = null;
    }
  }

  celdas.forEach((celda) => {
    celda.addEventListener('click', () => {
      abrirModal(celda.dataset.proyecto, celda);
    });
  });

  btnCerrar.addEventListener('click', cerrarModal);

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      cerrarModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !overlay.hidden) {
      cerrarModal();
    }
  });
});