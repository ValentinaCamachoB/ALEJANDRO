function obtenerEdad (){
    return new Promise ((resolver, reject ) => {
        setTimeout (() => {
            resolver(17);
        }, 2000);
    });
}

function verificarMayorDeEdad (edad) {
    return new Promise ((resolve, reject) => {

        if (edad >= 18) {
            resolve ("Eres mayor de edad");
        }else{
            reject ("Eres menor de edad");
        }

    });
}

obtenerEdad ()
.then ((edad) => {
    return verificarMayorDeEdad(edad);
})
.then ((mensaje) => {
    console.log (mensaje);
})
.catch((error) => {
    console.error(error);
});