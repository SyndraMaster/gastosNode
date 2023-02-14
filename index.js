const express = require('express');
const app = express();
const ejs = require('ejs')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

main().catch(err => console.log(err));

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

    console.log(resultado[0].total)
    return resultado[0].total;
  }

  app.post('/', (req, res) => {
    // Totamos los datos del formulario para agregarlos
    // en un documento
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
    // Recargamos la página con los datos actualizados
    res.redirect('/');
  });
  app.get('/', async (req, res) => {
    // Ejecutamos la actualización de la suma en la base de datos
    
    let todasTransacciones = await Transacciones.find({})
    let resultadoSuma = await sumaValores();
    res.render(__dirname + '/index', { valor: resultadoSuma, lista: todasTransacciones});
  })
}

app.listen(3000, () => {
  console.log('Tu server está listo para usarse en el puerto 3000');
})
