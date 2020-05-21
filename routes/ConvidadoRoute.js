const ConvidadoController = require("./../controller/ConvidadoController");

class ConvidadoRoute {
  constructor(app) {
    //Definições das outras rotas

    app
      .route("/convidados")
      .get(ConvidadoController.buscarTodos)
      .post(ConvidadoController.adicionar)
      .put(ConvidadoController.editar)
      .delete(ConvidadoController.deletar);

    app.route("/convidados/:id").delete(ConvidadoController.deletarPorId);
  }
}

module.exports = ConvidadoRoute;
