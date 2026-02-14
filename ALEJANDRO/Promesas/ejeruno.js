
function saludar(nombre) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {

            if (nombre === "Valentina") {
                resolve("Hola Valentina, bienvenida");
            } else {
                reject("No te conozco");
            }

        }, 2000);
    });
}

saludar("Valentina")
    .then((mensaje) => {
        console.log(mensaje);  
    })
    .catch((error) => {
        console.error(error);
    });


    saludar("Pedro")
  .then((mensaje) => {
    console.log( mensaje);
  })
  .catch((error) => {
    console.error( error); 
  });
