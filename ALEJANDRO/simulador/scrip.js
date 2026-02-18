const spinner = document.getElementById("spinner");
const btn = document.getElementById("btn");
const inputId = document.getElementById("inputId");
const resultado = document.getElementById("resultado");


const users = [
    { id: 1, name: "Juan Pérez", email: "juan.perez@example.com" },
    { id: 2, name: "María Gómez", email: "maria.gomez@example.com" },
    { id: 3, name: "Carlos Rodríguez", email: "carlos.rodriguez@example.com" },
    { id: 4, name: "Laura Martínez", email: "laura.martinez@example.com" },
    { id: 5, name: "Andrés López", email: "andres.lopez@example.com" },
];


function showSpinner(id) {
    return new Promise((resolve, reject) => {


        btn.classList.add("hide");
        btn.classList.remove("show");
        spinner.classList.remove("hide");
        spinner.classList.add("show");

        setTimeout(() => {

            spinner.classList.add("hide");
            spinner.classList.remove("show");
            btn.classList.remove("hide");
            btn.classList.add("show");
            btn.disabled = false;


            const usuario = users.find((u) => u.id === id);

            if (usuario) {
                resolve(usuario);
            } else {
                reject("No se encontró ningún usuario con el ID " + id + ".");
            }
        }, 2000);

    });
}


function mostrarUsuario(usuario) {
    resultado.innerHTML =
        '<div class="exito">' +
        '<p><span>ID:</span> ' + usuario.id + '</p>' +
        '<p><span>Nombre:</span> ' + usuario.name + '</p>' +
        '<p><span>Correo:</span> ' + usuario.email + '</p>' +
        '</div>';
}

function mostrarError(mensaje) {
    resultado.innerHTML = '<div class="error">' + mensaje + '</div>';
}


btn.addEventListener("click", () => {

    const idTexto = inputId.value.trim();

    if (idTexto === "") {
        mostrarError("Por favor ingresa un ID antes de buscar.");
        return;
    }

    const id = parseInt(idTexto);
    btn.disabled = true;
    resultado.innerHTML = "";

    showSpinner(id)
        .then((usuario) => {
            mostrarUsuario(usuario);
        })
        .catch((err) => {
            mostrarError(err);
        });

});