const database = require('../models');
const uuid = require('uuid')

class PermissaoService {
    async cadastrarPermissao(dto){
        const permissao = await database.permissoes.findOne({
            where: {
                nome: dto.nome
            }
        });

        if (permissao) {
            throw new Error("Permissão já cadastrada");
        }

        try {
            const newPermissao = await database.permissoes.create({
                id: uuid.v4(),
                nome: dto.nome,
                descricao: dto.descricao
            });

            return newPermissao;
            
        } catch (error) {
            throw new Error("Erro cadastrar permissao");
            
        }
    }

    async buscarTodosProdutos(){
        const permissoes = await database.permissoes.findAll();

        return permissoes;
    }

    async buscarPermissaoPorId(id){
        const permissao = await database.permissoes.findOne({
            where: {
                id: id
            }
        });

        if (!permissao) {
            throw new Error("Permissão informada não encontrada");
            
        }

        return permissao;
    }
}

module.exports = PermissaoService;