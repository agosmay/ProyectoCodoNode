const express = require('express');
const router = express.Router();

const {inicioGET, agregarGET, editarGET, loginGET, contactoGET, registerGET, contactoPOST, loginPOST, registerPOST, agregarPOST, productosGET, editarPOST, borrarGET} = require('../controllers/controllers')

//rutas GET

router.get('/', inicioGET)
router.get('/agregar-producto', agregarGET)
router.get('/editar-producto/:id', editarGET)
router.get('/login', loginGET)
router.get('/contacto', contactoGET)
router.get('/productos', productosGET)
router.get('/borrar-producto/:id', borrarGET)



//rutas POST

router.post('/contacto', contactoPOST)
router.post('/login', loginPOST)
router.post('/agregar-producto', agregarPOST)
router.post('/editar-producto/:id', editarPOST)




module.exports  = router