type CategoriaProducto = "alimentos" | "tecnología" | "papelería";
 
type Producto = {
  id: number;
  nombre: string;
  cantidad: number;
  categoria: CategoriaProducto;
};
 
function tieneBajoStock(producto: Producto): boolean {
  if (producto.categoria === "alimentos") {
    return producto.cantidad < 20;
  } else if (producto.categoria === "tecnología") {
    return producto.cantidad < 5;
  } else if (producto.categoria === "papelería") {
    return producto.cantidad < 50;
  }
  return false;
}
 
// Prueba
const productos: Producto[] = [
  { id: 1, nombre: "Arroz", cantidad: 15, categoria: "alimentos" },
  { id: 2, nombre: "Laptop", cantidad: 6, categoria: "tecnología" },
  { id: 3, nombre: "Cuadernos", cantidad: 30, categoria: "papelería" },
];
productos.forEach((p) => {
  console.log(`Ejercicio 7 - ${p.nombre}: bajo stock = ${tieneBajoStock(p)}`);
});