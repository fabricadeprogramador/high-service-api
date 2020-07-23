const Mongoose = require("mongoose");
class Transacao extends Mongoose.Schema {
  constructor() {
    super({
      empresa: {
        type: String,
        required: true,
      },
      cliente: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Cliente",
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
        enum: ["Em Andamento", "Concluído", "Cancelado"],
        required: true,
      },
      ativo: {
        type: Boolean,
        required: true,
      },
      produtosServicos: [
        {
          _id: Mongoose.Schema.ObjectId,
          nome: {
            type: String,
            required: true,
          },
          tipo: {
            type: String,
            enum: ["Serviço", "Produto"],
            required: true,
          },
          valor: {
            type: Number,
            required: true,
          },
          descricao: {
            type: String,
            required: true,
          },
          img: {
            required: false,
          },
          ativo: {
            type: Boolean,
            required: true,
          },
        },
      ],
    });

    //Registrando Schema no Mongoose
    Mongoose.model("Transacao", this);
  }
}

module.exports = Transacao;
