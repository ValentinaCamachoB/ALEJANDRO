
const estado = {
    busquedas: [],
};


export function agregarBusqueda(datoClima) {
    estado.busquedas.push(datoClima);
}


export function establecerBusquedas(listaBusquedas) {
    estado.busquedas = listaBusquedas;
}


export function obtenerBusquedas() {
    return [...estado.busquedas];
}


export function eliminarBusqueda(indice) {
    estado.busquedas.splice(indice, 1);
}