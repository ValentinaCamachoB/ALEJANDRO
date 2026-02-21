const spinner = document.getElementById("spinner");
const btn = document.getElementById("btn");
const inputId = document.getElementById("inputId");
const resultado = document.getElementById("resultado");


const users = [
    { id: 1, name: "Laura Gomez", email: "laura@email.com", city: "Medellin" },
    { id: 2, name: "Carlos Ruiz", email: "carlos@email.com", city: "Bogotá" },
    { id: 3, name: "Sofía Martínez", email: "sofia@email.com", city: "Cali" },
    { id: 4, name: "Andrés López", email: "andres@email.com", city: "Barranquilla" },
    { id: 5, name: "Valentina Torres", email: "valentina@email.com", city: "Cartagena" }
];

const products = [
    { id: 101, userId: 1, name: "Laptop", price: 3500, status: "Enviado" },
    { id: 102, userId: 1, name: "Mouse Gamer", price: 150, status: "Entregado" },
    { id: 103, userId: 2, name: "Teclado Mecanico", price: 280, status: "En proceso" },
    { id: 104, userId: 3, name: "Monitor 24 pulgadas", price: 900, status: "Entregado" },
    { id: 105, userId: 3, name: "Base Refrigerante", price: 120, status: "Enviado" },
    { id: 106, userId: 4, name: "Audifonos Bluetooth", price: 200, status: "Cancelado" }
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
                reject("No se encontro ningun usuario con el ID " + id + ".");
            }
        }, 2000);

    });
}

function buscarPedidos(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const pedidos = products.filter((p) => p.userId === userId);
            if (pedidos.length > 0) {
                resolve(pedidos);
            } else {
                reject("El usuario no tiene pedidos registrados.");
            }
        }, 1500);
    });
}

function buscarUltimoPedido(pedidos) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (pedidos.length > 0) {
                resolve(pedidos[pedidos.length - 1]);
            } else {
                reject("No se pudo obtener el último pedido.");
            }
        }, 1500);
    });
}
function mostrarUsuario(usuario) {
    resultado.innerHTML =
        '<div class="exito">' +
        '<h3>Datos del Usuario</h3>' +
        '<p><span>ID:</span> ' + usuario.id +
        '</p>' + '<p><span>Nombre:</span> ' + usuario.name +
        '</p>' + '<p><span>Correo:</span> ' + usuario.email + '</p>' +
        '</div>';
}

  function mostrarPedidos(pedidos) {
            let html = '<div class="pedidos-container"><h3>Productos del Usuario</h3>';

            pedidos.forEach(function (pedido) {
                html +=
                    '<div class="producto">' +
                    '<p><span>Nombre:</span> ' + pedido.name + '</p>' +
                    '<p><span>Precio:</span> $' + pedido.price + '</p>' +
                    '<p><span>Estado:</span> ' + pedido.status + '</p>' +
                    '</div>';
            });

            html += '</div>';
            resultado.innerHTML += html;
        }

   


function mostrarUltimoPedido(pedido) {
    resultado.innerHTML +=
        '<div class="exito">' +
        '<h3>Último Pedido Compra Registrada</h3>' +
        '<p><span>Producto:</span> ' + pedido.name + '</p>' +
        '<p><span>Precio:</span> $' + pedido.price + '</p>' +
        '<p><span>Estado:</span> ' + pedido.status + '</p>' +
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
            return buscarPedidos(usuario.id);
        })
        .then((pedidos) => {
            mostrarPedidos(pedidos);
            return buscarUltimoPedido(pedidos);
        })
        .then((ultimoPedido) => {
            mostrarUltimoPedido(ultimoPedido);
        })
        .catch((err) => {
            mostrarError(err);
        });

});
