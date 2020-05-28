"use strict";

const Express = require("express");
const Mongoose = require("mongoose");
const Cors = require("cors");

const env = process.NODE_ENV || "development";
const config = require("./config.json")[env];

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
    this.app.use(Cors());

    //Conexão com o banco de dados MongoDB
    Mongoose.connect(
      `mongodb://${config.db.user}:${config.db.password}@${config.db.url}:${config.db.porta}/${config.db.nome}`,
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
    this.app.listen(process.env.PORT || config.port, () => {
      console.log(`API - High Service rodando na porta ${config.port}`);
    });
  }
}

new App().init();
