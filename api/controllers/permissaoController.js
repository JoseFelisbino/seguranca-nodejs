const PermissaoService = require('../services/permissaoService');

const permissaoService = new PermissaoService();

class PermissaoController {
    static async cadastrar(req, res) {
        const { nome, descricao} = req.body;

        try {
            const permissao = await permissaoService.cadastrarPermissao({nome, descricao});

            res.status(201).send(permissao);
        } catch (error) {
            res.status(400).send({message: error.message});
        }
    }

    static async buscarTodasPermissoes(req, res){
        const permissoes = await permissaoService.buscarTodosProdutos();

        res.status(200).json(permissoes);
    }

}

module.exports = PermissaoController