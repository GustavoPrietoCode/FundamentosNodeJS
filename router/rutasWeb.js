const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {titulo : 'Mi titulo dinámico desde el router: rutasWeb.'})
})

router.get('/servicios', (req, res) => {
    res.render('servicios', {tituloServicios : 'Mi titulo dinámico en servicios desde el router: rutasWeb.'})
})

module.exports = router;
