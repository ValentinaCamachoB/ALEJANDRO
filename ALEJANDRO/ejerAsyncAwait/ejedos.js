async function getUser() {
    return new Promise((res) => {
        setTimeout(() => {
            const user = {
                id: 10,
                nombre: "Carlos Ruiz",
            };
            res(user);
        }, 1500);
    });
}

async function getTasksByUser(userId) {
    return new Promise((res) => {
        setTimeout(() => {
            const tareas = [
                { id: 1, titulo: "Revisar correos" },
                { id: 2, titulo: "Preparar presentacion" },
                { id: 3, titulo: "Reunion de equipo" },
            ];
            res(tareas);
        }, 1000);
    });
}

async function loadUserTasks() {
    try {
        const usuario = await getUser();
        const tareas = await getTasksByUser(usuario.id);
        console.log(usuario.nombre);
        console.log(tareas);
    } catch (error) {
        console.log(error);
    }
}

loadUserTasks();