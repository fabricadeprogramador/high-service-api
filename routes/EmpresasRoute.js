const EmpresaController = require("../controller/EmpresaController");

class EmpresasRoute {
  constructor(app) {
    app
      .route("/empresas")
      .get(EmpresaController.buscarTodos)
      .post(EmpresaController.adicionar)
      .put(EmpresaController.editar);

    app.route("/empresas/inativar/:_id").put(EmpresaController.inativar);

    //INICIO ROTA PRODUTOSESERVICOS
    app
      .route("/empresas/produtoseservicos")
      .post(EmpresaController.adicionarProdutoServico)
      .put(EmpresaController.editarProdutoServico);
    // .delete(EmpresaController.deleteProdutoServicoSemId);

    app
      .route("/empresas/produtoseservicos")
      .get(EmpresaController.buscarTodosProdutosServicosPorId);

    app
      .route("/empresas/produtoseservicos/ativarInativar")
      .put(EmpresaController.ativarInativarProdutoServico);
    //FIM ROTA PRODUTOSESERVICOS

    //Rotas Mensagens
    app
      .route("/empresas/mensagens")
      .get(EmpresaController.buscarMensagens)
      .put(EmpresaController.adicionarMensagens);
    //Fim da rota mensagens
  }
}

module.exports = EmpresasRoute;
