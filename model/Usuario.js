const Mongoose = require("mongoose");
class Usuario extends Mongoose.Schema {
  constructor() {
    super({
      
      username: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      tipo: {
        type: String,
        required: true,
      },
      ativo: {
        type: Boolean,
        required: true,
      },
    });

    


    //Registrando Schema no Mongoose
    Mongoose.model("Usuario", this);
  }
}

module.exports = Cliente;
