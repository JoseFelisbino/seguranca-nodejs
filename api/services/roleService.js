const database = require('../models');
const uuid = require('uuid');

class RoleService {
    async cadastrar(dto) {
        const role = await database.roles.findOne({
            where: {
                nome: dto.nome
            }
        })

        if (role) {
            throw new Error("Role já cadastrada");
        }

        try {
            const newRole = await database.roles.create({
                id: uuid.v4(),
                nome: dto.nome,
                descricao: dto.descricao
            });

            return newRole;
        } catch (error) {
            throw new Error("Erro ao cadastrar role");
        }
    }

     async buscarTodosRoles() {
        const roles = await database.roles.findAll();

        return roles
    }

    async buscarRolePorId(id){
        const role = await database.roles.findOne({
            where: {
                id: id
            }
        });

        if (!role) {
            throw new Error("Role informado não encontrado");
        }

        return role;
    }

    async deletarRolePorId(id){
        await this.buscarRolePorId(id);

        try {
            await database.roles.destroy({
                where: {
                    id: id
                }
            });
        } catch (error) {
            throw new Error("Erro ao tentar deletar role");
        }
    }
}

module.exports = RoleService;