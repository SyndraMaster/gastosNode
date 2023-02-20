
const express = require('express');
const app = express();
const ejs = require('ejs')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const chart  = require ('chart.js');
const { json } = require('stream/consumers');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

main().catch(err => console.log(err));
// const grafica = new Chart
async function main() {
  // Nos conectamos a la base de datos, en este caso un host local
  await mongoose.connect('mongodb://127.0.0.1:27017/transaccionesDB');
  // Establecemos el esquema que usaremos
  const transaccionesSchema = new mongoose.Schema({
    nombre: String,
    valor: Number,
    categoria: String,
    tipo: String,
    fecha: {
      type: Date,
      default: Date.now
    }
  });
  // Establecemos la colleción y el esquema que usaremos
  // La colleción se creará si ya no existe además de agregar una S al final
  const Transacciones = mongoose.model('transaccion', transaccionesSchema);

  async function sumaValores() {
    // Ejecuta una agregación en la base de datos
    // Para sumar el total de valores
    const resultado = await Transacciones.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$valor" }
        }
      }
    ]).exec();
    // Si no hay documentos ni valores
    // devuelve el resultado como 0
    if (resultado.length === 0) {
      return 0;
    }
    return resultado[0].total;
  }

  app.post('/', (req, res) => {
    // Tomamos los datos del formulario para agregarlos
    // en un documento
    let descripcion = req.body.descripcion;
    let valorFormulario = req.body.valor;
    let categoriaFormulario = req.body.categoria;
    let tipoFormulario = req.body.tipo;
    if (tipoFormulario == 'gasto') {
      valorFormulario *= -1;
    }
    const nuevaEntrada = new Transacciones({
      nombre: descripcion,
      valor: valorFormulario,
      categoria: categoriaFormulario,
      tipo: tipoFormulario
    })
    if (valorFormulario != null) {
      nuevaEntrada.save();
    }
    // Recargamos la página con los datos actualizados
    res.redirect('/');
  });
  app.get('/', async (req, res) => {
    // Recorremos todas las transacciones para enviarlas al modulo de Transacciones en el documento
    let todasTransacciones = await Transacciones.find({})
    // Hacemos la suma de el arreglo dependiendo de si es gasto o esgreso
    function suma (arreglo)  {
      let sum = 0;
      // console.log(arreglo);
      for (let i = 0; i < arreglo.length; i++) {
        if (arreglo[i] != undefined) {
          const element = arreglo[i].valor;
          sum += element;
        }
      }
      return sum;
    }
    // Obtenemos el arreglo con todos los ingresos
    let ingresos = todasTransacciones.filter(ingreso => ingreso.valor > 0);
    let chartIngresos = ingresos.map(ingreso => {
      return {
        fecha: ingreso.fecha.getFullYear() + '-' + ingreso.fecha.getMonth(),
        valor: ingreso.valor
      }
    });
    // Obtenemos el arreglo con todos los egresos
    let egresos = todasTransacciones.filter(egreso => egreso.valor < 0);
    let chartEgresos = egresos.map(egreso => {
      return {
        fecha: egreso.fecha.getFullYear() + '-' + egreso.fecha.getMonth(),
        valor: egreso.valor
      }
    });
    let sumaIngresos = suma(chartIngresos);
    let sumaEgresos = suma(chartEgresos);
    console.log(sumaIngresos);
    console.log(sumaEgresos);
    // Mandamos al ejs un array con las transacciones y la fecha.
    let dataChart = todasTransacciones.map(gasto => {
      return {
        fecha: gasto.fecha.getFullYear() + '-' + gasto.fecha.getMonth() + '-' + gasto.fecha.getDate(),
        valor: gasto.valor
      }
    });
    async function clasificar () {
      let clasificacion = await Transacciones.aggregate([
       {
         $group: {
           _id: { $dateToString: { format: "%Y-%m-%d", date: "$fecha" } },
           registros: { $push: "$valor" }
         }
       }
     ])
     return clasificacion;
    }
    let clasificados = await clasificar();
    console.log( clasificados);
    // Ejecutamos la actualización de la suma en la base de datos
    let resultadoSuma = await sumaValores();
    res.render(__dirname + '/index', { valor: resultadoSuma, lista: todasTransacciones, dataChart: JSON.stringify(dataChart)});
  })
}


app.listen(3000, () => { 
  console.log('Tu server está listo para usarse en el puerto 3000');
})
