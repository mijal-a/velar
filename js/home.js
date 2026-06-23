// VELAR — home.js
// Cada ventana es un <a> con href real a su página.
// Al click: mostramos el estado "abierto" (con el nombre de la página)
// durante un instante y luego navegamos, para que se sienta como que
// la ventana realmente se abre antes de entrar.

document.addEventListener('DOMContentLoaded', () => {
  const windows = document.querySelectorAll('.window');
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  const OPEN_DELAY = prefersReducedMotion ? 0 : 650;

  windows.forEach((win) => {
    win.addEventListener('click', (event) => {
      const href = win.getAttribute('href');
      if (!href || win.classList.contains('is-opening')) return;

      event.preventDefault();
      win.classList.add('is-opening');

      window.setTimeout(() => {
        window.location.href = href;
      }, OPEN_DELAY);
    });
  });
});
