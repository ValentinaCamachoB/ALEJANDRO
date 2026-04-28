type TipoCambio = "nombre" | "correo" | "contraseña";
 
type CambioUsuario = {
  tipo: TipoCambio;
  valorAnterior: string;
  valorNuevo: string;
};
 
function resumenCambios(cambios: CambioUsuario[]) {
  return cambios.reduce(
    (acc, cur) => {
      acc[cur.tipo] += 1;
      return acc;
    },
    { nombre: 0, correo: 0, contraseña: 0 }
  );
}
 
// Prueba
const historial: CambioUsuario[] = [
  { tipo: "nombre", valorAnterior: "Val", valorNuevo: "Valentina" },
  { tipo: "correo", valorAnterior: "v@old.com", valorNuevo: "v@new.com" },
  { tipo: "contraseña", valorAnterior: "1234", valorNuevo: "abcd" },
  { tipo: "nombre", valorAnterior: "Valentina", valorNuevo: "Vale" },
];
console.log("Ejercicio 5:", resumenCambios(historial));