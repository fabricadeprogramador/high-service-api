const ClientesController = require("./../controller/ClientesController");

class ClientesRoute {
  constructor(app) {
    //Definições das outras rotas

    app
      .route("/clientes")
      .get(ClientesController.buscarTodos)
      .post(ClientesController.adicionar)
      .put(ClientesController.editar);

    app
      .route("/clientes/ativarInativar")
      .put(ClientesController.ativarInativar);
  }
}

module.exports = ClientesRoute;
