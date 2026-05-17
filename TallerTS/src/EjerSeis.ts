type CategoriaCalificacion = "tareas" | "quices" | "examen";
 
type Calificacion = {
  estudianteId: number;
  materia: string;
  categoria: CategoriaCalificacion;
  nota: number;
};
 
function promedioPorCategoria(
  calificaciones: Calificacion[],
  estudianteId: number
) {
  const delEstudiante = calificaciones.filter(
    (c) => c.estudianteId === estudianteId
  );

  const acumulado = delEstudiante.reduce(
    (acc, cur) => {
      acc[cur.categoria].suma += cur.nota;
      acc[cur.categoria].cantidad += 1;
      return acc;
    },
    {
      tareas: { suma: 0, cantidad: 0 },
      quices: { suma: 0, cantidad: 0 },
      examen: { suma: 0, cantidad: 0 },
    }
  );

  return {
    tareas:
      acumulado.tareas.cantidad === 0
        ? 0
        : acumulado.tareas.suma / acumulado.tareas.cantidad,

    quices:
      acumulado.quices.cantidad === 0
        ? 0
        : acumulado.quices.suma / acumulado.quices.cantidad,

    examen:
      acumulado.examen.cantidad === 0
        ? 0
        : acumulado.examen.suma / acumulado.examen.cantidad,
  };
}
 

const calificaciones: Calificacion[] = [
  { estudianteId: 1, materia: "Matemáticas", categoria: "tareas", nota: 4.0 },
  { estudianteId: 1, materia: "Matemáticas", categoria: "tareas", nota: 3.5 },
  { estudianteId: 1, materia: "Matemáticas", categoria: "quices", nota: 4.5 },
  { estudianteId: 1, materia: "Matemáticas", categoria: "examen", nota: 3.8 },
  { estudianteId: 2, materia: "Matemáticas", categoria: "tareas", nota: 5.0 },
];
const resultado = promedioPorCategoria(calificaciones, 1);
console.log("Ejercicio 6: promedios", resultado);