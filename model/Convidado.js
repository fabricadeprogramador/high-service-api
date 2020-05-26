const Mongoose = require("mongoose");
class Convidado extends Mongoose.Schema {
  constructor() {
    super({
      nome: {
        type: String,
        required: true,
      },
      idade: {
        type: Number,
      },
      sexo: {
        type: String,
      },
    });

    //Registrando Schema no Mongoose
    Mongoose.model("Convidado", this);
  }
}

module.exports = Convidado;
