const UsuariosService = require('../services/usuarioService');

const usuarioService = new UsuariosService();

class UsuarioController {
    static async cadastrar(req, res) {
        const {nome, email, senha} = req.body;

        try {
            const usuario = await usuarioService.cadastrar({nome, email, senha});

            res.status(201).send(usuario)
        } catch (error) {
            res.status(400).send({message: error.message})
        }

        
    }

    static async buscarTodosUsuarios(req, res){
        const usuarios = await usuarioService.buscarTodosUsuarios();

        return res.status(200).json(usuarios);
    }

}

module.exports = UsuarioController;