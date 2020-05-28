const Mongoose = require("mongoose");
const Convidado = Mongoose.model("Convidado");

class ConvidadoController {
  static async buscarTodos(req, res) {
    console.log("[CONVIDADO CONTROLLER] : CHAMOU O MÉTODO BUSCAR TODOS");
    try {
      res.json(await Convidado.find({}));
    } catch (error) {
      console.log("[CONVIDADO CONTROLLER] : buscarTodos => " + error);
      res.status(500).send("Erro ao buscar convidados!");
    }
  }

  static async adicionar(req, res) {
    try {
      let convidadoNovo = req.body;
      console.log(
        "[CONVIDADO CONTROLLER] : CHAMOU O MÉTODO ADICIONAR" +
          "\n PARÂMETRO: " +
          JSON.stringify(convidadoNovo)
      );
      res.status(201).json(await Convidado.create(convidadoNovo));
    } catch (error) {
      res.status(500).send("Erro ao inserir novo convidado: " + error);
    }
  }

  static async deletar(req, res) {
    try {
      let convidadoDeletar = req.body;

      console.log(
        "[CONVIDADO CONTROLLER] : CHAMOU O MÉTODO DELETAR" +
          "\n PARÂMETRO: " +
          JSON.stringify(convidadoDeletar)
      );

      if (convidadoDeletar._id == undefined) {
        res.send("Atributos insuficientes para a ação!");
      } else {
        res
          .status(200)
          .json(await Convidado.findByIdAndDelete(convidadoDeletar._id));
      }
    } catch (error) {
      console.log("[CONVIDADO CONTROLLER] : DELETAR => " + error);

      res.status(500).send("Erro ao deletar convidado!");
    }
  }

  static async deletarPorId(req, res) {
    try {
      let idDeletar = req.params.id;

      console.log(
        "[CONVIDADO CONTROLLER] : CHAMOU O MÉTODO DELETAR QUERY PARAM" +
          "\n PARÂMETRO: " +
          idDeletar
      );

      res.status(200).json(await Convidado.findByIdAndDelete(idDeletar));
    } catch (error) {
      console.log("[CONVIDADO CONTROLLER] : DELETAR => " + error);

      res.status(500).send("Erro ao deletar convidado!");
    }
  }

  static async editar(req, res) {
    try {
      let convidadoEditar = req.body;

      console.log(
        "[CONVIDADO CONTROLLER] : CHAMOU O MÉTODO EDITAR" +
          "\n PARÂMETRO: " +
          JSON.stringify(convidadoEditar)
      );

      if (
        convidadoEditar._id == undefined ||
        convidadoEditar.nome == undefined ||
        convidadoEditar.idade == undefined ||
        convidadoEditar.sexo == undefined
      ) {
        res.status(200).send("Atributos insuficientes para a ação!");
      } else {
        res
          .status(200)
          .json(
            await Convidado.findByIdAndUpdate(
              convidadoEditar._id,
              convidadoEditar
            )
          );
      }
    } catch (error) {
      console.log("[CONVIDADO CONTROLLER] : EDITAR => " + error);

      res.status(500).send("Erro ao editar convidado!");
    }
  }
}

module.exports = ConvidadoController;
