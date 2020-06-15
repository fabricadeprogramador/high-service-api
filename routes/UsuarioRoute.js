const UsuarioController = require("../controller/UsuarioController");

class UsuarioRoute {
  constructor(app) {
    //Definições das outras rotas

    app
      .route("/usuarios")
      .get(UsuarioController.buscarTodos)
      .post(UsuarioController.adicionar)
      .put(UsuarioController.editar)
      

      app.route("/usuarios/ativarInativar").put(UsuarioController.ativarInativar);

    
      
  }
}

module.exports = UsuarioRoute;
