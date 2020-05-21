const Convidado = require("./../model/Convidado");

let geradorId = 4;
let convidados = [
  new Convidado(0, "Jão da Silva", 75, "M"),
  new Convidado(1, "Maria do Bairro", 35, "F"),
  new Convidado(2, "Zé do Caixão", 80, "M"),
  new Convidado(3, "Maurício de Souza", 50, "M"),
];

class ConvidadoController {
  static buscarTodos(req, res) {
    res.json(convidados);
  }

  static adicionar(req, res) {
    let convidado = req.body;
    convidado.id = geradorId;
    convidados.push(convidado);
    geradorId++;
    res.status(201).json(convidado);
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
