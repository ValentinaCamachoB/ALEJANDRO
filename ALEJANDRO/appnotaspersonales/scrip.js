
const colores = ['#D3D3D3','#FFFACD'];
let indiceColor = 0;

function agregarNota() {

    const titulo = document.getElementById('titulo').value.trim();
    const contenido = document.getElementById('contenido').value.trim();

    if (titulo === '' || contenido === '') {
        alert('Por favor escribe un título y contenido');
        return;
    }

    const nota = document.createElement('div');
nota.className = 'nota'; 

    indiceColor = (indiceColor + 1) % colores.length;

    nota.innerHTML = `
        <div class="titulo-nota">${titulo}</div>
        <div class="texto-nota">${contenido}</div>
        <div class="botones-nota">
            <button class="boton-icono" onclick="marcarImportante(this)">☆</button>
            <button class="boton-icono" onclick="eliminarNota(this)">🗑️</button>
        </div>
    `;

    document.getElementById('listaNotas').appendChild(nota);

    document.getElementById('titulo').value = '';
    document.getElementById('contenido').value = '';
}

function marcarImportante(boton) {

    const nota = boton.parentElement.parentElement;
    const lista = document.getElementById('listaNotas');

    if (nota.classList.contains('importante')) {

        nota.classList.remove('importante');
        boton.textContent = '☆';
        lista.appendChild(nota); 

    } else {

        nota.classList.add('importante');
        boton.textContent = '★';
        lista.prepend(nota); 
    }
}

function eliminarNota(boton) {

    const nota = boton.parentElement.parentElement;
    nota.remove();
}