const EmpresaController = require("../controller/EmpresaController");

class EmpresasRoute {
  constructor(app) {
   

    app
      .route("/empresas")
      .get(EmpresaController.buscarTodos) 
      .post(EmpresaController.adicionar)
      .put(EmpresaController.editar)

      
     // app.route("/empresas/:_id").post(EmpresaController.inativar)

      //Rotas Mensagens
      app.route("/empresas/mensagens")
      .get(EmpresaController.buscarMensagens)
      .put(EmpresaController.adicionarMensagens);
      
      
      
     
     //Fim da rota mensagens
         
  }
}

module.exports = EmpresasRoute;
