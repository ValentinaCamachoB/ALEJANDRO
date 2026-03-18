// Dirección de la API para buscar ciudades por nombre
const urlGeo = "https://geocoding-api.open-meteo.com/v1/search";
 
// Dirección de la API para obtener el clima
const urlClima = "https://api.open-meteo.com/v1/forecast";
 
// Busca una ciudad por nombre y devuelve sus coordenadas
export async function obtenerCoordenadas(nombreCiudad) {
    const respuesta = await fetch(
        `${urlGeo}?name=${encodeURIComponent(nombreCiudad)}&count=1&language=es&format=json`
    );
 
    // Si la petición falló, lanzamos un error
    if (!respuesta.ok) {
        throw new Error("Error al conectar con el servicio de geocodificación.");
    }
 
    const datos = await respuesta.json();
 
    // Si no encontró la ciudad, lanzamos un error
    if (!datos.results || datos.results.length === 0) {
        throw new Error(`No se encontró la ciudad "${nombreCiudad}". Intenta con otro nombre.`);
    }
 
    // Tomamos el primer resultado y devolvemos solo lo que necesitamos
    const ciudad = datos.results[0];
 
    return {
        nombre:   ciudad.name,
        pais:     ciudad.country ?? "Desconocido",
        latitud:  ciudad.latitude,
        longitud: ciudad.longitude,
    };
}
 
// Recibe latitud y longitud, y devuelve el clima actual de ese lugar
export async function obtenerClima(latitud, longitud) {
 
    // Armamos los parámetros que pide la API
    const parametros = new URLSearchParams({
        latitude:  latitud,
        longitude: longitud,
        current:   "temperature_2m,wind_speed_10m,weather_code",
        timezone:  "auto",
    });
 
    const respuesta = await fetch(`${urlClima}?${parametros}`);
 
    if (!respuesta.ok) {
        throw new Error("Error al obtener los datos del clima.");
    }
 
    const datos = await respuesta.json();
    const actual = datos.current;
 
    // Devolvemos solo los campos que usamos en la app
    return {
        temperatura:  actual.temperature_2m,
        viento:       actual.wind_speed_10m,
        codigoClima:  actual.weather_code,
        hora:         actual.time,
    };
}
 
// Convierte el código numérico del clima en una descripción en español
export function obtenerInfoClima(codigo) {
 
    // Tabla de códigos WMO con su descripción
    const mapaClima = {
        0:  "Cielo despejado",
        1:  "Mayormente despejado",
        2:  "Parcialmente nublado",
        3:  "Nublado",
        45: "Niebla",
        48: "Niebla con escarcha",
        51: "Llovizna ligera",
        53: "Llovizna moderada",
        55: "Llovizna intensa",
        61: "Lluvia ligera",
        63: "Lluvia moderada",
        65: "Lluvia intensa",
        71: "Nieve ligera",
        73: "Nieve moderada",
        75: "Nieve intensa",
        77: "Granizo",
        80: "Chubascos ligeros",
        81: "Chubascos moderados",
        82: "Chubascos violentos",
        85: "Chubascos de nieve",
        86: "Chubascos fuertes de nieve",
        95: "Tormenta eléctrica",
        96: "Tormenta con granizo",
        99: "Tormenta con granizo fuerte",
    };
 
    // Si el código no existe en la tabla, mostramos el número
    return mapaClima[codigo] ?? `Código ${codigo}`;
}
 