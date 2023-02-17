// import Chart from 'chart.js/auto';
let titulo = document.querySelector('.titulo-modal');
let agregar = document.querySelector('.agregar');
let quitar = document.querySelector('.disminuir');
let modal = document.querySelector('.formulario-modal');
let cerrar = document.querySelector('.cerrar');
let tipo = document.querySelector('.tipo');
let lista = document.querySelector('.lista-transacciones');
let ctx = document.querySelector('#lineChart').getContext('2d');
let TransaccionElements = document.getElementsByTagName('li');
let informacionParse = JSON.parse(informacion);
let categoriasEntrada = ['salario', 'prestamos', 'Venta', 'otro'];
let categoriasSalida =['vivienda', 'transporte', 'comida', 'entretenimiento', 'servicios', 'gastos innecesarios']

if (TransaccionElements.length > 5) {
    lista.style.overflowY = 'scroll';
}

cerrar.addEventListener('click', () => {
    modal.style.display = 'none';
});


agregar.addEventListener('click', () => {
   
    abrirModal('agregar');
});


quitar.addEventListener('click', () => {

    abrirModal('quitar');
});

var chartConfig = {
    type: 'line',
    data: {
        labels: informacionParse.map(element => element.fecha),
        datasets: [{
            label: 'Ventas',
            data: informacionParse.map(element => element.valor),
            borderColor: 'rgb(222, 76, 81)',
            borderWidth: 1,
            fill: false
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
};
var myChart = new Chart(ctx, chartConfig);

console.log(informacionParse[2].fecha);
    ////////////////////////////////////////////////////////
    // Dibujar el formulario según el botón ingresado.
function abrirModal (texto) {
    if (texto == 'agregar') {
        titulo.textContent = 'Agregar Ingreso';
        modal.style.display = 'flex';
        tipo.setAttribute('value', 'ingreso');
        agregarOpciones(categoriasEntrada);
    } else {
        titulo.textContent = 'Agregar Gasto';
        modal.style.display = 'flex';
        tipo.setAttribute('value', 'gasto');
        agregarOpciones(categoriasSalida);
    }
}

function agregarOpciones (lista) {
    document.querySelectorAll('option').forEach(element => {
        element.remove();
    });
    for (let i = 0; i < lista.length; i++) {
        const element = lista[i];
        let opciones = document.querySelector('.opciones');
        let opcion = document.createElement('option');
        opcion.setAttribute('value', element);
        opcion.textContent = element.charAt(0).toUpperCase() + element.slice(1);
        opciones.appendChild(opcion);
        
    }
}
