// Aquí guardamos los elementos del HTML que vamos a usar
const contenedor   = document.getElementById("container");
const spinner      = document.getElementById("spinner");
const mensajeError = document.getElementById("errorMsg");
 
// Muestra el spinner mientras se cargan los datos
export function mostrarSpinner() {
    spinner.classList.remove("hide");
    spinner.classList.add("show");
    mensajeError.classList.add("hide");
    mensajeError.textContent = "";
}
 
// Oculta el spinner cuando los datos ya cargaron
export function ocultarSpinner() {
    spinner.classList.remove("show");
    spinner.classList.add("hide");
}
 
// Muestra un mensaje de error en pantalla
export function mostrarError(mensaje) {
    mensajeError.textContent = mensaje;
    mensajeError.classList.remove("hide");
}
 
// Borra todas las tarjetas del contenedor
export function limpiarContenedor() {
    contenedor.innerHTML = "";
}
 
// Crea el HTML de una tarjeta con los datos del clima
// Recibe el objeto con los datos y el número de posición (para poder eliminarla)
function obtenerTarjeta(dato, indice) {
 
    // Convertimos la hora a un formato legible: "18 mar 2026, 10:30"
    const horaFormateada = new Date(dato.hora).toLocaleString("es-CO", {
        day:    "2-digit",
        month:  "short",
        year:   "numeric",
        hour:   "2-digit",
        minute: "2-digit",
    });
 
    // Devolvemos el HTML de la tarjeta como texto
    return `
    <div class="weather-card">
      <div class="card-header">
        <h3 class="card-city">${dato.ciudad}</h3>
        <button type="button" class="btn-eliminar" data-indice="${indice}">✕</button>
      </div>
      <p class="card-temp">${dato.temperatura}°C</p>
      <p class="card-desc">${dato.descripcion}</p>
      <div class="card-details">
        <p>Viento: <span>${dato.viento} km/h</span></p>
        <p>Medición: <span>${horaFormateada}</span></p>
      </div>
      <span class="card-country">${dato.pais}</span>
    </div>
  `;
}
 
// Muestra todas las tarjetas en pantalla
// También escucha si el usuario hace clic en el botón X de alguna tarjeta
export function renderizarBusquedas(listaBusquedas, alEliminar) {
 
    // Juntamos el HTML de todas las tarjetas en un solo string
    let htmlTotal = "";
    listaBusquedas.forEach((dato, indice) => {
        htmlTotal += obtenerTarjeta(dato, indice);
    });
 
    // Insertamos todas las tarjetas de una sola vez
    contenedor.innerHTML = htmlTotal;
 
    // Escuchamos clics en el contenedor para detectar si se presionó un botón X
    contenedor.onclick = function (evento) {
        const boton = evento.target.closest(".btn-eliminar");
        if (!boton) return;
        const indice = Number(boton.dataset.indice);
        alEliminar(indice);
    };
}