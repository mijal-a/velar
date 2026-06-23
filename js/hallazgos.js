// VELAR — hallazgos.js
// Datos de proyectos + apertura/cierre del modal con galería tipo
// "imagen principal + miniaturas" (estilo e-commerce).

const PROYECTOS = {
  'identidad-minujin': {
    titulo: 'Sistema de identidad visual',
    texto:
      'Sistema de identidad para un centro cultural inspirado en el universo experimental de Marta Minujín. Una propuesta visual flexible y en constante transformación, diseñada para acompañar la diversidad de actividades del espacio.',
    imagenes: [
      {
        src: 'assets/img/proyecto-minujin-01.png',
        alt: 'Sistema ',
      },
      {
        src: 'assets/img/TARJETON1 (2).jpg',
        alt: 'lámina 2',
      },
      {
        src: 'assets/img/TARJETON1 (1).jpg',
        alt: 'lámina 2',
      },
      {
        src: 'assets/img/TARJETON2 (1).jpg',
        alt: 'lámina 2',
      },
      {
        src: 'assets/img/TARJETON2 (2).jpg',
        alt: 'lámina 2',
      },
      {
        src: 'assets/img/TARJETON3 (1).jpg',
        alt: 'lámina 2',
      },
      {
        src: 'assets/img/TARJETON3 (2).jpg',
        alt: 'lámina 2',
      },
      {
        src: 'assets/img/hallazgo1-afiche.jpg',
        alt: 'lámina 2',
      },
      {
        src: 'assets/img/hallazgo1-banner.jpg',
        alt: 'lámina 2',
      },
      
    ],
  },

  'grafica-en-movimiento': {
    titulo: 'Gráfica en movimiento',
    texto: 'Video de gráfica en movimiento que explora forma, color y ritmo con transiciones fluidas y tipografía dinámica. Una pieza académica pensada para traducir ideas de diseño en una experiencia visual clara y energética.',
    imagenes: [
      {
        src: 'assets/img/hallazgo2.jpg',
        alt: 'a ',
      },
      
      {
        src: 'assets/img/hallazgo2_2.jpg',
        alt: 'a ',
      },
      {
        src: 'assets/img/hallazgo2_3.jpg',
        alt: 'a ',
      },
      {
        src: 'assets/img/hallazgo2_4.jpg',
        alt: 'a ',
      },
      {
        src: 'assets/img/hallazgo2_5.jpg',
        alt: 'a ',
      },
      {
        src: 'assets/img/hallazgo2_6.jpg',
        alt: 'a ',
      },
    ]
  }
  // Agregá acá cada proyecto nuevo, con la misma clave que pusiste
  // en data-proyecto del botón correspondiente en el HTML.
};

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.querySelector('[data-modal-overlay]');
  const modal = document.querySelector('[data-modal]');
  const modalTitulo = document.querySelector('[data-modal-titulo]');
  const modalTexto = document.querySelector('[data-modal-texto]');
  const imagenPrincipal = document.querySelector('[data-modal-imagen-principal]');
  const miniaturas = document.querySelector('[data-modal-miniaturas]');
  const btnCerrar = document.querySelector('[data-modal-cerrar]');
  const celdas = document.querySelectorAll('.grid-cell[data-proyecto]');

  if (!overlay || !modal) return;

  let ultimoDisparador = null;

  function mostrarImagen(imagen, index) {
    imagenPrincipal.src = imagen.src;
    imagenPrincipal.alt = imagen.alt || '';

    miniaturas.querySelectorAll('.modal__miniatura').forEach((btn, i) => {
      btn.classList.toggle('modal__miniatura--activa', i === index);
    });
  }

  function llenarModal(proyecto) {
    modalTitulo.textContent = proyecto.titulo;
    modalTexto.textContent = proyecto.texto;
    miniaturas.innerHTML = '';

    proyecto.imagenes.forEach((imagen, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'modal__miniatura';
      btn.setAttribute('aria-label', `Ver imagen ${index + 1}`);

      const img = document.createElement('img');
      img.src = imagen.src;
      img.alt = '';

      btn.appendChild(img);
      btn.addEventListener('click', () => mostrarImagen(imagen, index));
      miniaturas.appendChild(btn);
    });

    mostrarImagen(proyecto.imagenes[0], 0);
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