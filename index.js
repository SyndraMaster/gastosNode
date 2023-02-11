const express = require('express');
const app = express();
const ejs = require('ejs')
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/transaccionesDB');
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
  const Transacciones = mongoose.model('transaccion', transaccionesSchema);
  async function sumaValores () {
    const resultado = await Transacciones.aggregate([
    {
      $group: {
        _id: null,
        total: {$sum: "$valor"}
      }
    }
  ]).exec();
  if (resultado.length === 0) {
    return 0;
  }
  
  console.log(resultado[0].total)
  return resultado[0].total;
} 
app.post('/', (req,res) => {
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
    res.redirect('/');
  });
  app.get('/', async (req,res) => {
    let resultadoSuma =  await sumaValores();
    res.render(__dirname + '/index', {valor: resultadoSuma});
  })
}

app.listen(3000, () => {
    console.log('Tu server está listo para usarse en el puerto 3000');
})
