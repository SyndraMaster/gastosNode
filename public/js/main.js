// import Chart from 'chart.js/auto';
let titulo = document.querySelector('.titulo-modal');
let agregar = document.querySelector('.agregar');
let quitar = document.querySelector('.disminuir');
let modal = document.querySelector('.formulario-modal');
let cerrar = document.querySelector('.cerrar');
// import Chart from 'chart.js/auto';

let tipo = document.querySelector('.tipo');
let lista = document.querySelector('.lista-transacciones');
let ctx = document.querySelector('#lineChart').getContext('2d');
let TransaccionElements = document.getElementsByTagName('li');
let informacionParse = JSON.parse(informacion);

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
// document.querySelector('.lista-transacciones').style.overglowY = 'scroll';