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

  static async buscarTodosComUsuarios(req, res) {
    console.log("[CLIENTES CONTROLLER] : CHAMOU O MÉTODO BUSCAR TODOS");
    try {
      res.json(await Cliente.find({}).populate("usuario", "username ativo"));
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

  static async deletar(req, res) {
    try {
      let clienteDeletar = req.body;

      console.log(
        "[CLIENTES CONTROLLER] : CHAMOU O MÉTODO DELETAR" +
          "\n PARÂMETRO: " +
          JSON.stringify(clienteDeletar)
      );

      if (clienteDeletar._id == undefined) {
        res.send("Atributos insuficientes para a ação!");
      } else {
        res
          .status(200)
          .json(await Cliente.findByIdAndDelete(clienteDeletar._id));
      }
    } catch (error) {
      console.log("[CLIENTES CONTROLLER] : DELETAR => " + error);

      res.status(500).send("Erro ao deletar cliente!");
    }
  }

  static async deletarPorId(req, res) {
    try {
      let idDeletar = req.params.id;

      console.log(
        "[CLIENTES CONTROLLER] : CHAMOU O MÉTODO DELETAR QUERY PARAM" +
          "\n PARÂMETRO: " +
          idDeletar
      );

      res.status(200).json(await Cliente.findByIdAndDelete(idDeletar));
    } catch (error) {
      console.log("[CLIENTES CONTROLLER] : DELETAR => " + error);

      res.status(500).send("Erro ao deletar cliente!");
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
}

module.exports = ClientesController;
