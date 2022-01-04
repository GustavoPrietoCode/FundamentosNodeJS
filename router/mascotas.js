const express = require('express');
const router = express.Router();
const Mascota = require('../models/mascota')

router.get('/', async(req, res) => {

    try {
        const arrayMascotasDB = await Mascota.find();
        //console.log(arrayMascotasDB)
        res.render('mascotas', {
            arrayMascotas: arrayMascotasDB
            /* arrayMascotas: [
                {id: 'prueba1', nombre: 'rex', descripcion: 'rex descripciom'},
                {id: 'prueba2', nombre: 'rex2', descripcion: 'rex2 descripciom'},
            ] */
        })

    }catch (error){
        console.log (error)
    }

})

router.get('/crear', (req, res)=> {
    res.render('crear')
})

router.post('/', async(req, res)=>{
    const body = req.body;
    //console.log(body);
    try{
        //const mascotaDB = new Mascota(body) //respuesta de BD // construcción de nueva mascota
        //await mascotaDB.save() //esto viene de mongoose

        await Mascota.create(body);
        res.redirect('/mascotas'); //lleva al usuario a la ruta elegida

    }catch (error){
        console.log (error)
    }
})

router.get('/:id', async (req, res)=>{
    const id = req.params.id //almacena el id de la url
    try{
        const mascotaDB = await Mascota.findOne({_id: id}) //buscará en la BD el id de la const id -- En mongo el id viene con guion bajo
        //console.log(mascotaDB);
        res.render('detalle', {
            mascota: mascotaDB,
            error: false
        })
    }catch (error){
        console.log (error)
        res.render('detalle', {
            error: true,
            mensaje: 'No se encuenra el id seleccionado'
        })
    }
})

router.delete('/:id', async(req, res)=>{
    const id = req.params.id //almacena el id de la url --leemos el id con el params

    try {
        const mascotaDB = await Mascota.findByIdAndDelete({_id: id})
        
        if(mascotaDB) {
            //respuesta en json debido a que con render da errores...
            res.json({
                estado: true,
                mensaje: 'eliminado'
            })
        }else {
            res.json({
                estado: false,
                mensaje: 'Falla a la hora de eliminar'
            })
        }
    }catch (error){
        console.log (error)
        res.render('detalle', {
            error: true,
            mensaje: 'No se encuentra el id seleccionado'
        })
    }
})

router.put('/:id',  async(req, res)=>{  //PUT pasamos por la url el id...
    const id = req.params.id //almacena el id de la url
    const body = req.body //rescatamos los valores de los inputs.

    try {
        const mascotaDB = await Mascota.findByIdAndUpdate(id, body, { useFindAndModify: false })//doc mongoose
        console.log(mascotaDB);

        //si es correcto, manda este mensaje
        res.json({
            estado: true,
            mensaje: 'Editado'
        })
    } catch (error) {
        console.log (error)
        //si falla, manda este mensaje
        res.render('detalle', {
            error: true,
            mensaje: 'No se ha podido editar'
        })
    }

})

module.exports = router;