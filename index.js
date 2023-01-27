const express = require('express');
const app = express();
const ejs = require('ejs')
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.get('/', (req,res) => {
    res.render(__dirname + '/index');
})
app.listen(3000, () => {
    console.log('Tu server está listo para usarse');
})