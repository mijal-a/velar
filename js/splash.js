// VELAR — splash.js
// Estado 1 -> Estado 2: al hacer click en "Estudio de diseño" se revela
// el copy + botón DESCUBRIR (que ya es un link directo a home.html).

document.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash');
  const toggle = document.getElementById('estudioToggle');
  const descubrirBtn = document.getElementById('botonDescubrir');

  if (!splash || !toggle) return;

  toggle.addEventListener('click', () => {
    if (splash.classList.contains('is-revealed')) return;

    splash.classList.add('is-revealed');
    toggle.setAttribute('aria-expanded', 'true');

    // Movemos el foco al botón recién revelado, para que quien navega
    // con teclado o lector de pantalla siga el flujo natural.
    if (descubrirBtn) {
      window.setTimeout(() => descubrirBtn.focus(), 350);
    }
  });
});
