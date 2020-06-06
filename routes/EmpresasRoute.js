const EmpresaController = require("../controller/EmpresaController");

class EmpresasRoute {
  constructor(app) {
   

    app
      .route("/empresas")
      .get(EmpresaController.buscarTodos) 
      .post(EmpresaController.adicionar)
      .put(EmpresaController.editar)

      app.route("/empresas/:_id").post(EmpresaController.inativar);
    
  }
}

module.exports = EmpresasRoute;
