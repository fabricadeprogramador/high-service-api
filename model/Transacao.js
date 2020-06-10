const Mongoose = require("mongoose");
class Transacao extends Mongoose.Schema {
  constructor() {
    super({
      empresa: {
        type: String,
        required: true,
      },
      cliente: {
        type: String,
        required: true,
      },
      valor: {
        type: Number,
        required: true,
      },
      data: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
      ativo: {
        type: Boolean,
        required: true,
      }
    });

    //Registrando Schema no Mongoose
    Mongoose.model("Transacao", this);
  }
}

module.exports = Transacao;
