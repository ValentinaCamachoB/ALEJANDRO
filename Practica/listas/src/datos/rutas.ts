export type Dificultad = "baja" | "media" | "alta";

export interface Ruta {
  id: number;
  nombre: string;
  municipio: string;
  duracionHoras: number;
  dificultad: Dificultad;
  precio: number;
  incluyeTransporte: boolean;
}

export const rutas: Ruta[] = [
  { id: 1, nombre: "Valle de Cocora y palma de cera", municipio: "Salento", duracionHoras: 6, dificultad: "media", precio: 85000, incluyeTransporte: true },
  { id: 2, nombre: "Mirador y calles de colores", municipio: "Filandia", duracionHoras: 3, dificultad: "baja", precio: 40000, incluyeTransporte: false },
  { id: 3, nombre: "Recorrido por finca cafetera", municipio: "Montenegro", duracionHoras: 4, dificultad: "baja", precio: 65000, incluyeTransporte: true },
  { id: 4, nombre: "Ascenso a la Estrella de Agua", municipio: "Salento", duracionHoras: 9, dificultad: "alta", precio: 150000, incluyeTransporte: true },
  { id: 5, nombre: "Senderos del jardín botánico", municipio: "Calarcá", duracionHoras: 3, dificultad: "baja", precio: 50000, incluyeTransporte: false },
  { id: 6, nombre: "Cañón del río Barbas", municipio: "Filandia", duracionHoras: 5, dificultad: "media", precio: 70000, incluyeTransporte: false },
  { id: 7, nombre: "Miradores de Buenavista", municipio: "Buenavista", duracionHoras: 4, dificultad: "media", precio: 60000, incluyeTransporte: true },
];