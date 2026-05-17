type RolUsuario = "admin" | "editor" | "visitante";
 
type Usuario = {
  nombre: string;
  edad: number;
  activo: boolean;
  rol: RolUsuario;
};
 
function filtrarUsuarios(usuarios: Usuario[]): Usuario[] {
  return usuarios.filter(
    (u) => u.edad >= 18 && u.activo && u.rol !== "visitante"
  );
}
 

const usuarios: Usuario[] = [
  { nombre: "Valentina", edad: 22, activo: true, rol: "admin" },
  { nombre: "Carlos", edad: 16, activo: true, rol: "editor" },
  { nombre: "María", edad: 30, activo: false, rol: "editor" },
  { nombre: "Pedro", edad: 25, activo: true, rol: "visitante" },
  { nombre: "Laura", edad: 28, activo: true, rol: "editor" },
];
console.log("Ejercicio 8:", filtrarUsuarios(usuarios));