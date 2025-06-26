document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario-cita");
  const mensajeReserva = document.getElementById("mensaje-reserva");
  const listaCitas = document.getElementById("lista-citas");

  // Mostrar reservas guardadas al cargar la página
  mostrarReservas();

  formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = formulario.nombre.value.trim();
    const email = formulario.email.value.trim();
    const telefono = formulario.telefono.value.trim();
    const servicio = formulario.servicio.value.trim();
    const mensaje = formulario.mensaje.value.trim();

    if (!nombre || !email || !mensaje) {
      mensajeReserva.innerHTML = `<p style="color: red;">Por favor completa los campos obligatorios.</p>`;
      return;
    }

    const reserva = {
      id: Date.now(),
      nombre,
      email,
      telefono,
      servicio,
      mensaje,
      fecha: new Date().toLocaleString()
    };

    guardarReserva(reserva);
    formulario.reset();
    mensajeReserva.innerHTML = `<p style="color: green;">¡Gracias ${nombre}! Tu cita fue registrada.</p>`;
    mostrarReservas();
  });

  function guardarReserva(reserva) {
    let reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    reservas.push(reserva);
    localStorage.setItem("reservas", JSON.stringify(reservas));
  }

  function eliminarReserva(id) {
    let reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    reservas = reservas.filter(res => res.id !== id);
    localStorage.setItem("reservas", JSON.stringify(reservas));
    mostrarReservas();
  }

  function mostrarReservas() {
    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

    if (reservas.length === 0) {
      listaCitas.innerHTML = "<p>No hay reservas registradas.</p>";
      return;
    }

    let html = `
      <h3>Citas Registradas</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Servicio</th>
            <th>Mensaje</th>
            <th>Fecha</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
    `;

    reservas.forEach(res => {
      html += `
        <tr>
          <td>${res.nombre}</td>
          <td>${res.email}</td>
          <td>${res.telefono}</td>
          <td>${res.servicio}</td>
          <td>${res.mensaje}</td>
          <td>${res.fecha}</td>
          <td><button class="eliminar-btn" onclick="eliminarReserva(${res.id})">Eliminar</button></td>
        </tr>
      `;
    });

    html += `</tbody></table>`;
    listaCitas.innerHTML = html;
  }

  // Hacer la función global para que funcione el onclick en botones generados dinámicamente
  window.eliminarReserva = eliminarReserva;
});
