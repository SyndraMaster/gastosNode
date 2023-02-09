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
    fecha: String
  });
  const Transacciones = mongoose.model('transaccion', transaccionesSchema);
  const transaccion = new Transacciones ({
    nombre: 'Arriendo',
    valor: 420000,
    categoria: 'Vivienda',
    tipo: 'gasto',
    fecha: '2023-01-30'
  })
  // transaccion.save();
  const consulta = await Transacciones.find({nombre: 'Arriendo'});
  console.log(consulta);
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
app.get('/', (req,res) => {
    res.render(__dirname + '/index');
})

app.listen(3000, () => {
    console.log('Tu server está listo para usarse en el puerto 3000');
})
