const UsuarioController = require("../controller/UsuarioController");

class UsuarioRoute {
  constructor(app) {
    //Definições das outras rotas

    app
      .route("/usuarios")
      .get(UsuarioController.buscarTodos)
      .post(UsuarioController.adicionar)
      .put(UsuarioController.editar)
      .post(UsuarioController.inativo);
    
  }
}

module.exports = UsuarioRoute;
