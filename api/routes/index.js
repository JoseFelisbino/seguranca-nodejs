const bodyParser = require('body-parser')
 
const produto = require('./produtoRoute')
const usuario = require('./usuariosRoutes');
const auth = require('./authRoutes');


module.exports = app => {
  app.use(
    bodyParser.json(),
    produto,
    usuario,
    auth
  )
}
