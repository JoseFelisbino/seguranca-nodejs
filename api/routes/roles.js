const { Router } = require('express');
const RoleController = require('../controllers/roleController');

const router = Router();

router
    .post('/roles', RoleController.cadastrar)
    .get('/role', RoleController.buscarTodosRoles)
    .get('/role/:id', RoleController.buscarRolePorId)
    .delete('/role/:id', RoleController.deletarRolePorId)
    .put('/role/:id', RoleController.editarRolePorId)

module.exports = router;