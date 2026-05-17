type Unidad = "cm" | "m" | "km";
 
function convertirUnidad(valor: number, desde: Unidad, hacia: Unidad): number {
  // convertir todo a cm
  let enCm: number;
 
  if (desde === "cm") {
    enCm = valor;
  } else if (desde === "m") {
    enCm = valor * 100;
  } else {
    enCm = valor * 100000;
  }
 
  if (hacia === "cm") {
    return enCm;
  } else if (hacia === "m") {
    return enCm / 100;
  } else {
    return enCm / 100000;
  }
}
 

console.log("Ejercicio 9:");
console.log(`1 km = ${convertirUnidad(1, "km", "m")} m`);
console.log(`1 km = ${convertirUnidad(1, "km", "cm")} cm`);
console.log(`500 cm = ${convertirUnidad(500, "cm", "m")} m`);