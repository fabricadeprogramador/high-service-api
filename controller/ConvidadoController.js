const Convidado = require("./../model/Convidado");

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

  static deletar(req, res) {
    let convidadoDeletar = req.body;
    let i = 0;
    let achou = false;
    let deletado = null;
    while (i < convidados.length && !achou) {
      if (convidados[i].id == convidadoDeletar.id) {
        deletado = convidados.splice(i, 1);
        achou = true;
      }
      i++;
    }

    if (deletado == null) {
      res.send("Convidado não encontrado!");
    } else {
      res.json(deletado[0]);
    }
  }

  static deletarPorId(req, res) {
    let idDeletar = req.params.id;
    let i = 0;
    let achou = false;
    let deletado = null;
    while (i < convidados.length && !achou) {
      if (convidados[i].id == idDeletar) {
        deletado = convidados.splice(i, 1);
        achou = true;
      }
      i++;
    }

    if (deletado == null) {
      res.send("Convidado não encontrado!");
    } else {
      res.json(deletado[0]);
    }
  }

  static editar(req, res) {
    let convidadoEditar = req.body;

    if (
      convidadoEditar.id == undefined ||
      convidadoEditar.nome == undefined ||
      convidadoEditar.idade == undefined ||
      convidadoEditar.sexo == undefined
    ) {
      res.status(200).send("Convidado inválido!");
    } else {
      let encontrou = false;
      let convidadoFinal = {};
      for (let i = 0; i < convidados.length; i++) {
        if (convidados[i].id == convidadoEditar.id) {
          convidadoFinal = convidados.splice(i, 1, convidadoEditar);
          encontrou = true;
        }
      }

      if (encontrou) {
        res.json(convidadoFinal[0]);
      } else {
        res.send("Convidado não encontrado");
      }
    }
  }
}

module.exports = ConvidadoController;
