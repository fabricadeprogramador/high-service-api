const TransacaoController = require("../controller/TransacoesController");

class TransacaoRoute {
  constructor(app) {
    //Definições das outras rotas

    app
      .route("/transacao")
      .get(TransacaoController.buscarTodos)
      .post(TransacaoController.adicionar)
      .put(TransacaoController.editar);

    app
      .route("/transacao/ativarInativar")
      .put(TransacaoController.ativarInativar);
    app.route("/transacao/:id").delete(TransacaoController.deletarPorId);
    app
      .route("/transacao/cliente/:id")
      .get(TransacaoController.buscarPorIdDoCliente);
  }
}

module.exports = TransacaoRoute;
