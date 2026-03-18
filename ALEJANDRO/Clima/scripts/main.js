import { obtenerCoordenadas, obtenerClima, obtenerInfoClima } from "./service.js";
import { agregarBusqueda, establecerBusquedas, obtenerBusquedas, eliminarBusqueda } from "./state.js";
import { setLocalStorageValue, getLocalStorageValue }             from "./persistence.js";
import { mostrarSpinner, ocultarSpinner, mostrarError, renderizarBusquedas, limpiarContenedor } from "./ui.js";
 
 
const botonBuscar = document.getElementById("searchBtn");
const inputCiudad = document.getElementById("cityInput");
 
 
/**
 * Elimina una tarjeta del estado, actualiza localStorage y re-renderiza.
 * @param {number} indice - Posición de la tarjeta a eliminar.
 */
function manejarEliminar(indice) {
    eliminarBusqueda(indice);
    setLocalStorageValue("clima_busquedas", obtenerBusquedas());
    limpiarContenedor();
    renderizarBusquedas(obtenerBusquedas(), manejarEliminar);
}
 
 
async function manejarBusqueda() {
    const nombreCiudad = inputCiudad.value.trim();
 
    if (!nombreCiudad) {
        mostrarError("Por favor, escribe el nombre de una ciudad.");
        return;
    }
 
    mostrarSpinner();
 
    try {
        // Obtener coordenadas de la ciudad
        const datosCiudad = await obtenerCoordenadas(nombreCiudad);
 
        // Obtener el clima actual con las coordenadas
        const datosClima = await obtenerClima(datosCiudad.latitud, datosCiudad.longitud);
 
        // Traducir el código de clima a descripción
        const descripcion = obtenerInfoClima(datosClima.codigoClima);
 
        // Construir el objeto de resultado
        const resultado = {
            ciudad:      datosCiudad.nombre,
            pais:        datosCiudad.pais,
            temperatura: datosClima.temperatura,
            viento:      datosClima.viento,
            descripcion,
            hora:        datosClima.hora,
        };
 
        // Actualizar estado central
        agregarBusqueda(resultado);
 
        // Guardar en localStorage
        setLocalStorageValue("clima_busquedas", obtenerBusquedas());
 
        ocultarSpinner();
 
        // Mostrar todas las tarjetas pasando el callback de eliminación
        limpiarContenedor();
        renderizarBusquedas(obtenerBusquedas(), manejarEliminar);
 
        inputCiudad.value = "";
 
    } catch (error) {
        ocultarSpinner();
        mostrarError(error.message);
    }
}
 
 
/**
 * Carga el historial guardado en localStorage y registra los eventos.
 */
function iniciar() {
    // Recuperar búsquedas previas desde localStorage
    const busquedasGuardadas = getLocalStorageValue("clima_busquedas") ?? [];
 
    if (busquedasGuardadas.length > 0) {
        establecerBusquedas(busquedasGuardadas);
        renderizarBusquedas(obtenerBusquedas(), manejarEliminar);
    }
 
    
    botonBuscar.addEventListener("click", manejarBusqueda);
 
    
}
 
 
iniciar();