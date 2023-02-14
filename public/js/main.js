let titulo = document.querySelector('.titulo-modal');
let agregar = document.querySelector('.agregar');
let quitar = document.querySelector('.disminuir');
let modal = document.querySelector('.formulario-modal');
let cerrar = document.querySelector('.cerrar');
let tipo = document.querySelector('.tipo');
let lista = document.querySelector('.lista-transacciones');
let TransaccionElements = document.getElementsByTagName('li');
if (TransaccionElements.length > 5) {
    lista.style.overflowY = 'scroll';
}

cerrar.addEventListener('click', () => {
    modal.style.display = 'none';
});


agregar.addEventListener('click', () => {
    titulo.textContent = 'Agregar Ingreso';
    modal.style.display = 'flex';
    tipo.setAttribute('value', 'ingreso');
});


quitar.addEventListener('click', () => {
    titulo.textContent = 'Agregar Gasto';
    modal.style.display = 'flex';
    tipo.setAttribute('value', 'gasto');
});


console.log(titulo)

// document.querySelector('.lista-transacciones').style.overglowY = 'scroll';