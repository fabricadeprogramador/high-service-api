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
// DECLARACAO DE MENSAGENS

mensagens:[
  {

  cliente:{
  type: String,
  required: true,
  },

  assunto:{
    type:String,
    require:true,
    },

  conversa:[{
  
  mensagem:{
  type: String,
  required: true,
  },
  
  origem:{
    type:String,
    enum:["EMPRESA","CLIENTE"],
    require: true,
  },
 

  }],
  status:{
    type: String,
    enum:["VISTO","RESOLVIDO","EM ANDAMENTO","NAO RESOLVIDO"],
    required:true,
    }

}
],
// FIM DA DECLAÇAO DE MENSAGENS 

    });

    Mongoose.model("Empresa", this);
  }
}

module.exports = Empresa;
