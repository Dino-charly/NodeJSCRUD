const path = require('path')
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')

const app = express(); 

//conectar base de datos 
mongoose.connect('mongodb://localhost/practicamongo')
.then(db => console.log('base de datos conectada'))
.catch(err => console.log(err));


//rutas
const indexRoutes = require('./routes/index');

//configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view.engine', 'ejs');

//middlawares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//routes
app.use('/', indexRoutes);

//configuraciones del servidor
app.listen(app.get('port'), () =>{
    console.log('servidor conectado al puerto');
});