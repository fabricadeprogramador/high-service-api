const Mongoose = require("mongoose");
class Empresa extends Mongoose.Schema {
  constructor() {
    super({
      
      empresa: {
        type: String,
        required: true,
      },
      cnpj: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      telefone: {
        type: String,
        required: true,
      },
      ativo: {
        type: Boolean,
        required: true,
      },
    });

    Mongoose.model("Empresa", this);
  }
}

module.exports = Empresa;
