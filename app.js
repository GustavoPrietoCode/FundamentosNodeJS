const express = require('express');
//const bodyParser = require('body-parser'); //posible deprecated
const app = express();

// parse application/x-www-form-urlencoded // formularios
//app.use(bodyParser.urlencoded({ extended: false }))  //posible deprecated
app.use(express.urlencoded({ extended: true })); 

// parse application/json
//app.use(bodyParser.json()) //posible deprecated
app.use(express.json());



//Config dotenv
require('dotenv').config()

//heroku va a configurar su puerto, si no lo encuentra usa 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log('Servidor a su servicio en el puerto', PORT)
})

//conexión a Base de datos
const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.umggq.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(uri)
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log(e));


//Motor plantillas EJS y conexión carpeta Views
app.set('view engine', 'ejs');
app.set('views', __dirname + "/views");

//con dirname busca la raíz en la app, si se mueve, es dinámico, siempre encontrará.
app.use(express.static(__dirname + "/public"));

//ROUTER: rutas web
app.use('/', require('./router/rutasWeb'));
app.use('/mascotas', require('./router/mascotas'));

//middlewere 404
app.use((req, res, next) => {
    res.status(404).render('404', {
        titulo: 'Página 404',
        descripcion: 'Esta es la página 404 dinámica'
    })
})
