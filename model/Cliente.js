const Mongoose = require("mongoose");
class Cliente extends Mongoose.Schema {
  constructor() {
    super({
      nome: {
        type: String,
        required: true,
      },
      cpf: {
        type: String,
        required: true,
      },
      sexo: {
        type: String,
        required: true,
      },
      tel: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      logradouro: {
        type: String,
        required: true,
      },
      nr: {
        type: String,
        required: false,
      },
      complemento: {
        type: String,
        required: false,
      },
      bairro: {
        type: String,
        required: true,
      },
      cep: {
        type: String,
        required: true,
      },
      cidade: {
        type: String,
        required: true,
      },
      uf: {
        type: String,
        required: true,
      },
      ativo: {
        type: Boolean,
        required: true,
      },
      usuario: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: false,
      },
    });

    //Registrando Schema no Mongoose
    Mongoose.model("Cliente", this);
  }
}

module.exports = Cliente;
