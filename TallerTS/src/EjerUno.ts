type EstadoTarea = "pendiente" | "en_progreso" | "finalizada";
type Tarea = {
    id: number | string;
    descripcion: string;
    completada: boolean;
    estado: EstadoTarea;
};

function RecibirPendientesoProgreso(tareas: Tarea[]): Tarea[] {
    return tareas.filter((tarea) => {
        return tarea.estado === "pendiente" || tarea.estado === "en_progreso";
    });
}

const tareas: Tarea[] = [
  { id: 1, descripcion: "Hacer la compra", completada: false, estado: "pendiente" },
  { id: 2, descripcion: "Estudiar TypeScript", completada: false, estado: "en_progreso" },
  { id: 3, descripcion: "Lavar la ropa", completada: true, estado: "finalizada" },
];
console.log("Ejercicio 1:", RecibirPendientesoProgreso(tareas));