"use strict";

const Express = require("express");
const Mongoose = require("mongoose");

//Importação dos modelos
const Convidado = require("./model/Convidado");

class App {
  constructor() {
    this.app;
  }

  //Configurar o servidor HTTP
  init() {
    //this.app é agora uma instancia do express
    this.app = Express();

    this.app.use(Express.json());

    //Conexão com o banco de dados MongoDB
    Mongoose.connect(
      "mongodb://high-service-user:t27#2020@ds133659.mlab.com:33659/high-service-api",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    //Instanciando modelos
    new Convidado();

    //Importando as rotas
    const ConvidadoRoute = require("./routes/ConvidadoRoute");

    //Instanciando as rotas
    new ConvidadoRoute(this.app);

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
