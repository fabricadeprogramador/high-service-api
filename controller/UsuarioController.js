const Mongoose = require("mongoose");
const Usuario = Mongoose.model("Usuario");

class UsuarioController {
  static async buscarTodos(req, res) {
    console.log("[USUARIO CONTROLLER] : CHAMOU O MÉTODO BUSCAR TODOS");
    try {
      res.json(await Usuario.find({}));
    } catch (error) {
      console.log("[USUARIO CONTROLLER] : buscarTodos => " + error);
      res.status(500).send("Erro ao buscar usuarios!");
    }
  }

  static async adicionar(req, res) {
    try {
      let UsuarioNovo = req.body;
      console.log(
        "[USUARIO CONTROLLER] : CHAMOU O MÉTODO ADICIONAR" +
          "\n PARÂMETRO: " +
          JSON.stringify(UsuarioNovo)
      );
      res.status(201).json(await Usuario.create(UsuarioNovo));
    } catch (error) {
      res.status(500).send("Erro ao inserir novo usuario: " + error);
    }
  }

  static async editar(req, res) {
    try {
      let usuarioEditar = req.body;

      console.log(
        "[USUARIO CONTROLLER] : CHAMOU O MÉTODO EDITAR" +
          "\n PARÂMETRO: " +
          JSON.stringify(usuarioEditar)
      );

      const { _id, username, password, tipo } = req.body;

      const existeUsuario = await Usuario.findOne({ _id });

      if (!existeUsuario) {
        return res.status(400).json({ error: 'Usuario não existe' });
      }
      
      await existeUsuario.updateOne({
        username,
        password,
        tipo
      });
      
      return res.json(existeUsuario);
      
    } catch (error) {
      console.log("[USUARIO CONTROLLER] : EDITAR => " + error);

      res.status(500).send("Erro ao editar usuario!");
    }
  }
  

  static async inativos(req, res) {
    console.log("[USUARIO CONTROLLER] : CHAMOU O MÉTODO BUSCAR TODOS OS INATIVOS ");
    try {
      res.json(await Usuario.find({}));
    } catch (error) {
      console.log("[USUARIO CONTROLLER] : buscarTodos => " + error);
      res.status(500).send("Erro ao buscar usuarios!");
    }
  }



  static async inativar(req, res) {
    try {
      const { _id } = req.params;
      const usuarioInativo = req.body;

      console.log(
        "[USUARIO CONTROLLER] : CHAMOU O MÉTODO INATIVAR QUERY PARAM" +
          "\n PARÂMETRO: " +
          JSON.stringify(usuarioInativo)
      );

      const existeUsuario = await Usuario.findOne({ _id });

      if (!existeUsuario) {
        return res.status(400).json({ error: 'Usuario não existe' });
      }

      await existeUsuario.updateOne({
        ativo: false,
      });

      return res.json(existeUsuario);
      
    } catch (error) {
      console.log("[USUARIO CONTROLLER] : INATIVAR => " + error);

      res.status(500).send("Erro ao inativar usuario!");
    }
  }
}

module.exports = UsuarioController;
