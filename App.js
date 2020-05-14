"use strict";

const Express = require("express");

class App {
  constructor() {
    this.app;
  }

  //Configurar o servidor HTTP
  init() {
    //this.app é agora uma instancia do express
    this.app = Express();

    //Definição da rota raíz
    this.app.get("/", (req, res) => {
      res.send("Seja Bem-vindo a High Service API");
    });

    //Listener
    this.app.listen(3000, () => {
      console.log("API - High Service rodando na porta 3000");
    });
  }
}

new App().init();
