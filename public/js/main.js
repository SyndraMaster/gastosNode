let titulo = document.querySelector('.titulo-modal');
let agregar = document.querySelector('.agregar');
let quitar = document.querySelector('.disminuir');
let modal = document.querySelector('.formulario-modal');
let cerrar = document.querySelector('.cerrar');
cerrar.addEventListener('click', () => {
    modal.style.display = 'none';
})
agregar.addEventListener('click', () => {
    titulo.textContent = 'Agregar Ingreso';
    modal.style.display = 'flex';
})
quitar.addEventListener('click', () => {
    titulo.textContent = 'Agregar Gasto';
    modal.style.display = 'flex';
})
console.log(titulo)
