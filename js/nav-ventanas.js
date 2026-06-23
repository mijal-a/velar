// VELAR — nav-ventanas.js
// El tooltip con el nombre lo maneja 100% CSS (:hover / :focus-visible).
// Acá solo evitamos que clickear la ventana de la página en la que ya
// estás recargue la página de nuevo.

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.window-nav[aria-current="page"]').forEach((link) => {
    link.addEventListener('click', (event) => event.preventDefault());
  });
});