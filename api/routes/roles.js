const { Router } = require('express');
const RoleController = require('../controllers/roleController');

const router = Router();

router
    .post('/roles', RoleController.cadastrar)
    .get('/role', RoleController.buscarTodosRoles)
    .get('/role/:id', RoleController.buscarRolePorId)
    .delete('/role/:id')
    .put('/role/:id')

module.exports = router;