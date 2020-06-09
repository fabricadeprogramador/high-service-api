const Mongoose = require("mongoose");
const Cliente = Mongoose.model("Cliente");

class ClientesController {
  static async buscarTodos(req, res) {
    console.log("[CLIENTES CONTROLLER] : CHAMOU O MÉTODO BUSCAR TODOS");
    try {
      res.json(await Cliente.find({}));
    } catch (error) {
      console.log("[CLIENTES CONTROLLER] : buscarTodos => " + error);
      res.status(500).send("Erro ao buscar clientes!");
    }
  }

  static async adicionar(req, res) {
    try {
      let clienteNovo = req.body;
      console.log(
        "[CLIENTES CONTROLLER] : CHAMOU O MÉTODO ADICIONAR" +
          "\n PARÂMETRO: " +
          JSON.stringify(clienteNovo)
      );
      res.status(201).json(await Cliente.create(clienteNovo));
    } catch (error) {
      res.status(500).send("Erro ao inserir novo cliente: " + error);
    }
  }

  static async editar(req, res) {
    try {
      let clienteEditar = req.body;

      console.log(
        "[CLIENTES CONTROLLER] : CHAMOU O MÉTODO EDITAR" +
          "\n PARÂMETRO: " +
          JSON.stringify(clienteEditar)
      );

      if (
        clienteEditar._id == undefined ||
        clienteEditar.nome == undefined ||
        clienteEditar.cpf == undefined ||
        clienteEditar.sexo == undefined ||
        clienteEditar.tel == undefined ||
        clienteEditar.email == undefined ||
        clienteEditar.logradouro == undefined ||
        clienteEditar.bairro == undefined ||
        clienteEditar.cep == undefined ||
        clienteEditar.cidade == undefined ||
        clienteEditar.uf == undefined ||
        clienteEditar.ativo == undefined
      ) {
        res.status(200).send("Atributos insuficientes para a ação!");
      } else {
        res
          .status(200)
          .json(
            await Cliente.findByIdAndUpdate(clienteEditar._id, clienteEditar)
          );
      }
    } catch (error) {
      console.log("[CLIENTES CONTROLLER] : EDITAR => " + error);

      res.status(500).send("Erro ao editar cliente!");
    }
  }

  static async ativarInativar(req, res) {
    try {
      let IdAtivarInativar = req.body;
      console.log(
        "[CLIENTES CONTROLLER] : CHAMOU O MÉTODO ATIVARINATIVAR" +
          "\n PARÂMETRO: " +
          JSON.stringify(IdAtivarInativar)
      );
      if (IdAtivarInativar._id == undefined) {
        res.send("Atributos insuficientes para a ação!");
      } else {
        let clienteAtivarInativar = await Cliente.findById(
          IdAtivarInativar._id
        );
        clienteAtivarInativar.ativo = !clienteAtivarInativar.ativo;
        await Cliente.findByIdAndUpdate(
          IdAtivarInativar._id,
          clienteAtivarInativar
        );
        res.status(200).json(clienteAtivarInativar);
      }
    } catch (error) {
      console.log("[CLIENTES CONTROLLER] : ATIVARINATIVAR => " + error);

      res.status(500).send("Erro ao ativar ou inativar cliente!");
    }
  }
}

module.exports = ClientesController;
