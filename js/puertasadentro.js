/*document.addEventListener("DOMContentLoaded", () => {
  const manija = document.getElementById("btnManija");
  const equipo = document.getElementById("equipo");

  const integrantes = document.querySelectorAll(".integrante");

  let abierto = false;

  // ========================
  // ABRIR EQUIPO
  // ========================

 manija.addEventListener("click", () => {
  abierto = !abierto;

  equipo.classList.toggle("equipo-visible", abierto);

  manija.classList.toggle("abierta", abierto);

  manija.setAttribute(
    "aria-expanded",
    abierto ? "true" : "false"
  );
});

  // ========================
  // CLICK EN INTEGRANTE
  // ========================

  integrantes.forEach((integrante) => {
    integrante.addEventListener("click", (e) => {
      e.stopPropagation();

      cerrarBios();

      document.body.classList.add("bio-abierta");

      integrante.classList.add("bio-activa");
    });
  });

  // ========================
  // CLICK AFUERA
  // ========================

  document.addEventListener("click", () => {
    cerrarBios();
  });

  function cerrarBios() {
    document.body.classList.remove("bio-abierta");

    integrantes.forEach((integrante) => {
      integrante.classList.remove("bio-activa");
    });
  }
});*/

document.addEventListener("DOMContentLoaded", () => {
  const manija = document.getElementById("btnManija");
  const equipo = document.getElementById("equipo");

  const integrantes = document.querySelectorAll(".integrante");

  let abierto = false;

  // ========================
  // ABRIR EQUIPO
  // ========================

  manija.addEventListener("click", () => {
    abierto = !abierto;

    equipo.classList.toggle("equipo-visible", abierto);

    manija.classList.toggle("abierta", abierto);

    manija.setAttribute(
      "aria-expanded",
      abierto ? "true" : "false"
    );
  });

  // ========================
  // CLICK EN INTEGRANTES
  // ========================

  integrantes.forEach((integrante) => {
    integrante.addEventListener("click", (e) => {
      e.stopPropagation();

      const yaAbierta =
        integrante.classList.contains("bio-activa");

      cerrarBios();

      if (!yaAbierta) {
        integrante.classList.add("bio-activa");
      }
    });
  });

  // ========================
  // CLICK AFUERA
  // ========================

  document.addEventListener("click", () => {
    cerrarBios();
  });

  function cerrarBios() {
    integrantes.forEach((integrante) => {
      integrante.classList.remove("bio-activa");
    });
  }
});
