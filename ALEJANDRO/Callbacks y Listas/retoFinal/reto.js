const estudiantes = [
    { nombre: "Ana", nota: 4.5 },
    { nombre: "Luis", nota: 3.2 },
    { nombre: "Carlos", nota: 2.8 },
    { nombre: "Sofía", nota: 4.8 },
    { nombre: "María", nota: 3.9 }
];

const nombresEst = estudiantes.map(e => e.nombre);

const aprobados = estudiantes.filter(e => e.nota >= 3);

const destacado = estudiantes.find(e => e.nota >= 4.5);

console.log(nombresEst);
console.log(aprobados);
console.log(destacado);