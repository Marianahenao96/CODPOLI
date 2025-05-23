 // Espera a que se envíe el formulario de reserva de citas
 document.getElementById("formulario-cita").addEventListener("submit", function (e) {
  // Previene el comportamiento por defecto del formulario (recargar la página)
  e.preventDefault();

  // Obtiene el valor ingresado en el campo de nombre
  const nombre = document.getElementById("nombre-paciente").value;

  // Obtiene el valor seleccionado en el menú desplegable de servicios
  const servicio = document.getElementById("servicio-seleccion").value;

  // Verifica que ambos campos estén llenos
  if (nombre && servicio) {
    // Crea un nuevo elemento <li> para mostrar la cita agendada
    const li = document.createElement("li");

    // Establece el contenido del <li> con el nombre y el servicio elegido
    li.textContent = `${nombre} - ${servicio}`;

    // Agrega el <li> a la lista de citas agendadas en el HTML
    document.getElementById("lista-citas").appendChild(li);

    // Reinicia los campos del formulario para que queden vacíos
    this.reset();
  }
});
