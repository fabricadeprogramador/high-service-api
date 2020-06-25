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

      // Inicio entidade Produtos e Serviços
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
      // Fim    entidade Produtos e Serviços

      // DECLARACAO DE MENSAGENS
      mensagens: [
        {
          cliente: {
            type: String,
            required: true,
          },
          assunto: {
            type: String,
            required: true,
          },
          
          
              mensagem: {
                type: String,
                required: true,
              },
              data:{
                type:String,
                require:true,

              },
              origem: {
                type: String,
                enum: ["EMPRESA", "CLIENTE"],
                required: true,
              },
         
          status: {
            type: String,
            enum: ["VISTO","NAO VISTO", "RESOLVIDO", "EM ANDAMENTO", "NAO RESOLVIDO"],
            required: true,
          },
        },
      ],
      // FIM DA DECLAÇAO DE MENSAGENS
    });

    Mongoose.model("Empresa", this);
  }
}

module.exports = Empresa;
