const database = require('../models')

class UsuariosService {
    async cadastrar(dto) {
        const usuario = await database.usuarios.findOne({
            where: {
                email: dto.email
            }
        })

        if (usuario) {
            throw new Error('Ususario já cadastrado');
        }
    }
}

module.exports = UsuariosService;