const EmpresasController = require("../controller/EmpresasController");

class EmpresasRoute {
  constructor(app) {
   

    app
      .route("/empresas")
      .get(EmpresasController.buscarTodos)
      .post(EmpresasController.adicionar)
      .put(EmpresasController.editar)

      app.route("/empresas/:id").post(EmpresasController.inativar);
    
  }
}

module.exports = EmpresasRoute;
