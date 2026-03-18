// Este objeto guarda la lista de todas las búsquedas hechas
const estado = {
    busquedas: [],
};
 
// Agrega una nueva búsqueda al final de la lista
export function agregarBusqueda(datoClima) {
    estado.busquedas.push(datoClima);
}
 
// Reemplaza toda la lista con una nueva
// Se usa cuando cargamos búsquedas guardadas en localStorage
export function establecerBusquedas(listaBusquedas) {
    estado.busquedas = listaBusquedas;
}
 
// Devuelve una copia de la lista de búsquedas
// Usamos [...] para no devolver el original y evitar modificarlo por accidente
export function obtenerBusquedas() {
    return [...estado.busquedas];
}
 
// Elimina una búsqueda según su posición en la lista
// splice(indice, 1) significa: "borra 1 elemento en esa posición"
export function eliminarBusqueda(indice) {
    estado.busquedas.splice(indice, 1);
}