const Mongoose = require("mongoose");
const Empresa = Mongoose.model("Empresa");

class EmpresaController {
  static async buscarTodos(req, res) {
    console.log("[EMPRESA CONTROLLER] : CHAMOU O MÉTODO BUSCAR TODOS");
    try {
      res.json(await Empresa.find({}));
    } catch (error) {
      console.log("[EMPRESA CONTROLLER] : buscarTodos => " + error);
      res.status(500).send("Erro ao buscar empresas!");
    }
  }

  static async adicionar(req, res) {
    try {
      let empresaNova = req.body;
      console.log(
        "[EMPRESA CONTROLLER] : CHAMOU O MÉTODO ADICIONAR" +
          "\n PARÂMETRO: " +
          JSON.stringify(empresaNova)
      );
      res.status(201).json(await Empresa.create(empresaNova));
    } catch (error) {
      res.status(500).send("Erro ao inserir nova empresa: " + error);
    }
  }

  static async editar(req, res) {
    try {
      let empresaEditar = req.body;

      console.log(
        "[EMPRESA CONTROLLER] : CHAMOU O MÉTODO EDITAR" +
          "\n PARÂMETRO: " +
          JSON.stringify(empresaEditar)
      );

        const { _id, empresa, cnpj, email, telefone } = req.body;

        const existeEmpresa = await Empresa.findOne({ _id });

        if (!existeEmpresa) {
          return res.status(400).json({ error: 'Empresa não existe' });
        }

        await existeEmpresa.updateOne({
          empresa,
          cnpj,
          email,
          telefone,
        });
        
        return res.json(empresaEditada);
    } catch (error) {
      console.log("[EMPRESA CONTROLLER] : EDITAR => " + error);

      res.status(500).send("Erro ao editar empresa!");
    }
  }

  static async inativar(req, res) {
    try {
      const { _id } = req.params;
      const empresaInativar = req.body

      console.log(
        "[EMPRESA CONTROLLER] : CHAMOU O MÉTODO INATIVAR" +
          "\n PARÂMETRO: " +
          JSON.stringify(empresaInativar)
      );

      const existeEmpresa = await Empresa.findOne({
        _id
      });

      if (!existeEmpresa) {
        return res.status(400).json({ error: 'Empresa não existe' });
      }

      await existeEmpresa.updateOne({
        ativo: false,
      });

      return res.json(existeEmpresa);
    } catch (error) {
      console.log("[EMPRESA CONTROLLER] : INATIVAR => " + error);

      res.status(500).send("Erro ao inativar empresa!");
    }
  }

// METODOS PARA MENSAGENS 

static async buscarMensagens(req, res) {
  console.log("[EMPRESA CONTROLLER] : CHAMOU O MÉTODO BUSCAR MENSAGENS");
  try {
    res.json(await Empresa.find({},{"mensagens:":1}));
  } catch (error) {
    console.log("[EMPRESA CONTROLLER] : buscando Mensagens => " + error);
    res.status(500).send("Erro ao buscar mensagens!");
  }
}

static async adicionarMensagens(req, res) {
  try {
    let mensagemNova = req.body;
    console.log(
      "[EMPRESA CONTROLLER] : CHAMOU O MÉTODO ADICIONAR" +
        "\n PARÂMETRO: " +
        JSON.stringify(mensagemNova)
    );
    res.status(201).json(await Empresa.create(mensagemNova));
  } catch (error) {
    res.status(500).send("Erro ao inserir nova empresa: " + error);
  }
}



//FIM DO METODO



}

module.exports = EmpresaController;
