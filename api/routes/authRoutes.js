const { Router } = require('express');
const AuthController = require('../controllers/authController')
const UsuarioController = require('../controllers/usuarioController')

const router = Router();

router
    .post('/usuarios', UsuarioController.cadastrar)
    .post('/auth/login', AuthController.login)

module.exports = router;