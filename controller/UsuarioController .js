const Mongoose = require("mongoose");
const Usuario = Mongoose.model("Usuario");

class UsuarioController {
  static async buscarTodos(req, res) {
    console.log("[CONVIDADO CONTROLLER] : CHAMOU O MÉTODO BUSCAR TODOS");
    try {
      res.json(await Usuario.find({}));
    } catch (error) {
      console.log("[CONVIDADO CONTROLLER] : buscarTodos => " + error);
      res.status(500).send("Erro ao buscar convidados!");
    }
  }

  static async adicionar(req, res) {
    try {
      let UsuarioNovo = req.body;
      console.log(
        "[CONVIDADO CONTROLLER] : CHAMOU O MÉTODO ADICIONAR" +
          "\n PARÂMETRO: " +
          JSON.stringify(UsuarioNovo)
      );
      res.status(201).json(await Usuario.create(UsuarioNovo));
    } catch (error) {
      res.status(500).send("Erro ao inserir novo convidado: " + error);
    }
  }

  static async deletar(req, res) {
    try {
      let UsuarioDeletar = req.body;

      console.log(
        "[CONVIDADO CONTROLLER] : CHAMOU O MÉTODO DELETAR" +
          "\n PARÂMETRO: " +
          JSON.stringify(UsuarioDeletar)
      );

      if (UsuarioDeletar._id == undefined) {
        res.send("Atributos insuficientes para a ação!");
      } else {
        res
          .status(200)
          .json(await Usuario.findByIdAndDelete(UsuarioDeletar._id));
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

      res.status(200).json(await Usuario.findByIdAndDelete(idDeletar));
    } catch (error) {
      console.log("[CONVIDADO CONTROLLER] : DELETAR => " + error);

      res.status(500).send("Erro ao deletar convidado!");
    }
  }

  static async editar(req, res) {
    try {
      let usuarioEditar = req.body;

      console.log(
        "[CONVIDADO CONTROLLER] : CHAMOU O MÉTODO EDITAR" +
          "\n PARÂMETRO: " +
          JSON.stringify(usuarioEditar)
      );

      if (
        usuarioEditar._id == undefined ||
        usuarioEditar.nome == undefined ||
        usuarioEditar.idade == undefined ||
        usuarioEditar.sexo == undefined
      ) {
        res.status(200).send("Atributos insuficientes para a ação!");
      } else {
        res
          .status(200)
          .json(
            await Usuario.findByIdAndUpdate(
              usuarioEditar._id,
              usuarioEditar
            )
          );
      }
    } catch (error) {
      console.log("[CONVIDADO CONTROLLER] : EDITAR => " + error);

      res.status(500).send("Erro ao editar convidado!");
    }
  }
}

module.exports = UsuarioController;
