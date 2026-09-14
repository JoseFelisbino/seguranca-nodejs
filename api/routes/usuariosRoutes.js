const {Router} = require('express');
const UsuarioController = require('../controllers/usuarioController');
const autenticado = require('../middleware/autenticado');

const router = Router();

router.use(autenticado);

router
    .post('/usuarios', UsuarioController.cadastrar)
    .get('/usuarios', UsuarioController.buscarTodosUsuarios)
    .get('/usuarios/:id', UsuarioController.buscarUsuarioPorId)
    .put('/usuarios/:id', UsuarioController.editarProdutoPorId)
    .delete('/usuarios/:id', UsuarioController.deletarUsuarioPorId)

module.exports = router;