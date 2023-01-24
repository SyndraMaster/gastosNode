const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
app.use(express.static('public'));
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
})
app.listen(3000, () => {
    console.log('Tu server está listo para usarse');
})