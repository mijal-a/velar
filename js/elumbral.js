// VELAR — elumbral.js
// Click en una puerta -> la tarjeta reemplaza a la puerta (mismo lugar/tamaño).
// Click en cualquier otro lugar -> cierra la tarjeta abierta.

document.addEventListener('DOMContentLoaded', () => {
  const puertas = document.querySelectorAll('.puerta');

  puertas.forEach((puerta) => {
    const boton = puerta.querySelector('.puerta__boton');

    boton.addEventListener('click', (event) => {
      event.stopPropagation();
      const yaAbierta = puerta.classList.contains('puerta--abierta');
      cerrarTodas();
      if (!yaAbierta) {
        puerta.classList.add('puerta--abierta');
      }
    });
  });

  document.addEventListener('click', cerrarTodas);

  function cerrarTodas() {
    puertas.forEach((puerta) => puerta.classList.remove('puerta--abierta'));
  }
});