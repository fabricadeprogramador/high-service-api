const EmpresaController = require("../controller/EmpresaController");

class EmpresasRoute {
  constructor(app) {
    app
      .route("/empresas")
      .get(EmpresaController.buscarTodos)
      .post(EmpresaController.adicionar)
      .put(EmpresaController.editar);

    app.route("/empresas/inativar/:_id").put(EmpresaController.inativar);

    // ROTA MENSAGEM
    app
      .route("/empresas/mensagens")
      .get(EmpresaController.buscarMensagens)
      .post(EmpresaController.adicionarMensagens);
    //FIM DA ROTA MENSAGEM

    //INICIO ROTA PRODUTOSESERVICOS
    app
      .route("/empresas/produtoseservicos")
      .post(EmpresaController.adicionarProdutoServico)
      .put(EmpresaController.editarProdutoServico);
    // .delete(EmpresaController.deleteProdutoServicoSemId);

    app
      .route("/empresas/produtoseservicos/:id")
      .get(EmpresaController.buscarTodosProdutosServicosPorId);

    app
      .route("/empresas/produtoseservicos/ativarInativar")
      .put(EmpresaController.ativarInativarProdutoServico);
    //FIM ROTA PRODUTOSESERVICOS
  }
}

module.exports = EmpresasRoute;
