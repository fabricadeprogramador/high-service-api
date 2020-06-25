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

      app.route("/usuarios/esseaquiehsohprateste").delete(UsuarioController.deletarTudo);
      app.route("/usuarios/buscar").get(UsuarioController.buscarTudo);
      app.route("/usuarios/login").post(UsuarioController.login);
          
  }
}

module.exports = UsuarioRoute;
