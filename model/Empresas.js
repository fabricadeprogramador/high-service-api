const Mongoose = require("mongoose");
class Empresas extends Mongoose.Schema {
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
      produtosServiços: {
        type: String,
        required: true,
      },
      ativo: {
        type: Boolean,
        required: true,
      },
    });

    Mongoose.model("Empresas", this);
  }
}

module.exports = Empresas;
