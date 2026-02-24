async function login(email, password) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if (email === "admin@correo.com" && password === "1234") {
                res("Login exitoso");
            } else {
                rej("Credenciales incorrectas");
            }
        }, 2000);
    });
}

async function startLogin() {
    try {
        const resultado = await login("admin@correo.com", "1234");
        console.log(resultado);
    } catch (error) {
        console.log(error);
    }
}

startLogin();