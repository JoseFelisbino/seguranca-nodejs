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

    static async buscarUsuarioPorId(req, res){
        const {id} = req.params;

        try {
            const usuario = await usuarioService.buscarUsuarioPorId(id);

            res.status(200).json(usuario);
        } catch (error) {
            console.log("Message error", error.message);
            res.status(400).send({message: error.message});
        }
    }

    static async deletarUsuarioPorId(req, res){
        const { id } = req.params;

        try {
            await usuarioService.deletarUsuarioPorId(id);

            res.status(200).send({message: "Produto usuario deletado com sucesso"});
        } catch (error) {
            console.log("Message error", error.message);
            res.status(400).send({message: error.message});
        }
    }

    static async editarProdutoPorId(req, res){
        const { id } = req.params;
        const { nome, email } = req.body;

        try {
            const usuario = await usuarioService.editarProdutoPorId({
                id,
                nome,
                email
            });

            res.status(200).json(usuario);
        } catch (error) {
            console.log('Message error: ', error.message);
            res.status(400).send({ message: error.message});
        }
    }

}

module.exports = UsuarioController;