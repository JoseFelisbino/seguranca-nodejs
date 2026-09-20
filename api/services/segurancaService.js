const database = require('../models');
const Sequelize = require('sequelize')

class SegurancaService {
    async cadastrarAcl(dto) {
        const usuario = await database.usuarios.findOne({
            include: [
                {
                    model: database.roles,
                    as: 'usuarios_roles',
                    attributes: ['id', 'nome', 'descricao']
                },
                {
                    model: database.permissoes,
                    as: 'usuario_permissoes',
                    attributes: ['id', 'nome', 'descricao']
                }
            ],
            where: {
                id: dto.usuarioId
            }
        })

        if(!usuario) {
            throw new Error("Usuario não cadastrado");
        }

        const rolesCadastradas = await database.roles.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: dto.roles
                }
            }
        })

        const permissoesCadastradas = await database.permissoes.findAll({
            where: {
                id:{
                    [Sequelize.Op.in]: dto.permissoes
                }
            }
        })

        await usuario.removeUsuarios_roles(usuario.usuarios_roles)
        await usuario.removeUsuario_permissoes(usuario.usuarios_permissoes)

        await usuario.addUsuarios_roles(rolesCadastradas);
        await usuario.addUsuario_permissoes(permissoesCadastradas);

        const novoUsuario = await database.usuarios.findOne({
            include: [
                {
                    model: database.roles,
                    as: 'usuarios_roles',
                    attributes: ['id', 'nome', 'descricao']
                },
                {
                    model: database.permissoes,
                    as: 'usuario_permissoes',
                    attributes: ['id', 'nome', 'descricao']
                }
            ]
        })

        return novoUsuario;
    }
}

module.exports = SegurancaService;