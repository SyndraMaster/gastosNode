const express = require('express');
const app = express();
const ejs = require('ejs')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
let total = 0;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/transaccionesDB');
  const transaccionesSchema = new mongoose.Schema({
    nombre: String,
    valor: Number,
    categoria: String,
    tipo: String,
    fecha: Date
  });
  const Transacciones = mongoose.model('transaccion', transaccionesSchema);
  const transaccion = new Transacciones({
    nombre: 'Arriendo',
    valor: 420000,
    categoria: 'Vivienda',
    tipo: 'gasto',
    fecha: {
      type: Date,
      default: Date.now
    }
  });
  // transaccion.save();
  const consulta = await Transacciones.find({ nombre: 'Arriendo' });
  console.log(consulta);
  app.post('/', (req, res) => {
    let descripcion = req.body.descripcion;
    let valorFormulario = req.body.valor;
    let categoriaFormulario = req.body.categoria;
    let tipoFormulario = req.body.tipo;
    const nuevaEntrada = new Transacciones({
      nombre: descripcion,
      valor: valorFormulario,
      categoria: categoriaFormulario,
      tipo: tipoFormulario
    })
    nuevaEntrada.save();
    
    // res.redirect('/');
    if (total[0].total > 0) {
      res.render(__dirname + '/index', {valor: total[0].total});
    }
  });
  total = await Transacciones.aggregate([{
    $group: {
      _id: null,
      total: { $sum: "$valor" }
    }
  }]);
}
app.get('/', (req, res) => {
  if (total[0].total != []) {
    res.render(__dirname + '/index', {valor: total[0].total});
  } else {
    res.render(__dirname + '/index', {valor: 0});
  }
})

app.listen(3000, () => {
  console.log('Tu server está listo para usarse en el puerto 3000');
})
