const UsuarioController = require("../controller/UsuarioController");

class UsuarioRoute {
  constructor(app) {
    //Definições das outras rotas

    app
      .route("/usuarios")
      .get(UsuarioController.buscarTodos)
      .post(UsuarioController.adicionar)
      .put(UsuarioController.editar)
      .get(UsuarioController.inativos);

      app.route("/usuarios/:_id").post(UsuarioController.inativar);

    
      
  }
}

module.exports = UsuarioRoute;
