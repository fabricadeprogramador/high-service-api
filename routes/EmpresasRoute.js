const EmpresaController = require("../controller/EmpresaController");

class EmpresasRoute {
  constructor(app) {
   

    app
      .route("/empresas")
      .get(EmpresaController.buscarTodos) 
      .post(EmpresaController.adicionar)
      .put(EmpresaController.editar)

      app.route("/empresas/:_id").post(EmpresaController.inativar)
// ROTA MENSAGEM
      app.route("/empresas/mensagens")
      .get(EmpresaController.buscarMensagens)
      .post(EmpresaController.adicionarMensagens); 
      
 //FIM DA ROTA MENSAGEM   
    
  }
}

module.exports = EmpresasRoute;
