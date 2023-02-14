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
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
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