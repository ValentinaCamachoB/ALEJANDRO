type TipoCampo = "texto" | "numero" | "email";
 
type CampoFormulario = {
  nombre: string;
  tipo: TipoCampo;
  valor: string | number;
};
 
function validarCampos(campos: CampoFormulario[]): string[] {
  return campos.reduce((acc, campo) => {
    if (campo.tipo === "texto" && typeof campo.valor !== "string") {
      acc.push(campo.nombre);
    } else if (campo.tipo === "numero" && typeof campo.valor !== "number") {
      acc.push(campo.nombre);
    } else if (campo.tipo === "email" && !String(campo.valor).includes("@")) {
      acc.push(campo.nombre);
    }
    return acc;
  }, [] as string[]);
}
 

const campos: CampoFormulario[] = [
  { nombre: "nombre", tipo: "texto", valor: "Valentina" },
  { nombre: "edad", tipo: "numero", valor: 20 },
  { nombre: "correo", tipo: "email", valor: "correo-sin-arroba" },
  { nombre: "ciudad", tipo: "texto", valor: "" },
];
console.log("Ejercicio 4: Campos invalidos", validarCampos(campos));