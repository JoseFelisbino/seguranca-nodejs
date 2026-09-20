const bodyParser = require('body-parser')
 
const produto = require('./produtoRoute')
const usuario = require('./usuariosRoutes');
const auth = require('./authRoutes');
const role = require('./roles');
const permissao = require('./permissao');
const seguranca = require('./seguranca');

module.exports = app => {
  app.use(
    bodyParser.json(),
    auth,
    usuario,
    produto,
    role,
    permissao,
    seguranca
  );
}
