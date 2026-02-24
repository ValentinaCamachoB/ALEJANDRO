
async function getUsers() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            const hayError = false;

            if (hayError === false) {
                res([
                    { id: 1, nombre: "Ana Garcia" },
                    { id: 2, nombre: "Luis Perez" },
                    { id: 3, nombre: "Maria Lopez" },
                ]);
            } else {
                rej("Error: no se pudieron cargar los usuarios");
            }
        }, 2000);
    });
}

async function loadUsers() {
    try {
        const usuarios = await getUsers();
        console.log(usuarios);
    } catch (error) {
        console.log(error);
    }
}

loadUsers();