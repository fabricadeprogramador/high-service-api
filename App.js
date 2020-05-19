"use strict";

const Express = require("express");

class App {
  constructor() {
    this.app;
  }

  //Configurar o servidor HTTP
  init() {
    let geradorId = 4;
    let convidados = [
      {
        id: 0,
        nome: "Jão da Silva",
        idade: 75,
        sexo: "M",
      },
      {
        id: 1,
        nome: "Maria do Bairro",
        idade: 35,
        sexo: "F",
      },
      {
        id: 2,
        nome: "Zé do Caixão",
        idade: 80,
        sexo: "M",
      },
      {
        id: 3,
        nome: "Maurício de Souza",
        idade: 58,
        sexo: "M",
      },
    ];

    //this.app é agora uma instancia do express
    this.app = Express();

    this.app.use(Express.json());

    //Definição da rota raíz
    this.app.get("/", (req, res) => {
      res.send("Seja Bem-vindo a High Service API");
    });

    //Definições das outras rotas
    this.app.get("/convidados", (req, res) => {
      res.json(convidados);
    });

    this.app.post("/convidados", (req, res) => {
      let convidado = req.body;
      convidado.id = geradorId;
      convidados.push(convidado);
      geradorId++;
      res.json(convidado);
    });

    this.app.delete("/convidados", (req, res) => {
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
    });

    this.app.delete("/convidados/:id", (req, res) => {
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
    });

    //Listener
    this.app.listen(3000, () => {
      console.log("API - High Service rodando na porta 3000");
    });
  }
}

new App().init();
