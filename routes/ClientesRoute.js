const ClientesController = require("./../controller/ClientesController");

class ClientesRoute {
  constructor(app) {
    //Definições das outras rotas

    app
      .route("/clientes")
      .get(ClientesController.buscarTodosComUsuarios)
      .post(ClientesController.adicionar)
      .put(ClientesController.editar)
      .delete(ClientesController.deletar);

    app.route("/clientes/:id").delete(ClientesController.deletarPorId);
  }
}

module.exports = ClientesRoute;
