function obtenerNumero() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(10);
        }, 2000);
    });
}

function multiplicarPorDos(numero) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(numero * 2);
        }, 2000);
    });
}

obtenerNumero ()
.then ((num) => {
    return multiplicarPorDos (num);
    })

.then ((resultado)   =>  {
    console.log (resultado);
    })
.catch  ((error) => {
    console.error (error);
    });
