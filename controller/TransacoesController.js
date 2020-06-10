const Mongoose = require("mongoose");
const Transacao = Mongoose.model("Transacao");

class TransacoesController {
    static async buscarTodos(req, res) {
        console.log("[TRANSACOES CONTROLLER] : CHAMOU O MÉTODO BUSCAR TODOS");
        try {
        res.json(await Transacao.find({}));
        } catch (error) {
        console.log("[TRANSACAO CONTROLLER] : buscarTodos => " + error);
        res.status(500).send("Erro ao buscar Transacoes!");
        }
    }

    static async adicionar(req, res) {
        try {
          let transacao = req.body;
          console.log(
            "[TRANSACAO CONTROLLER] : CHAMOU O MÉTODO ADICIONAR" +
              "\n PARÂMETRO: " +
              JSON.stringify(transacao)
          );
          res.status(201).json(await Transacao.create(transacao));
        } catch (error) {
          res.status(500).send("Erro ao inserir nova transação: " + error);
        }
      }
    static async editar(req, res) {
        try {
        let transacaoEditar = req.body;

        console.log(
        "[CLIENTES CONTROLLER] : CHAMOU O MÉTODO EDITAR" +
            "\n PARÂMETRO: " +
            JSON.stringify(transacaoEditar)
        );

        if (
        transacaoEditar._id == undefined ||
        transacaoEditar.empresa == undefined ||
        transacaoEditar.cliente == undefined ||
        transacaoEditar.valor == undefined ||
        transacaoEditar.data == undefined ||
        transacaoEditar.status == undefined ||
        transacaoEditar.ativo == undefined) 
            {
                res.status(200).send("Campo obrigatório não preenchido");
                } else {
                res.status(200).json(await Transacao.findByIdAndUpdate(transacaoEditar._id, transacaoEditar));
            }
        } catch (error) {
            console.log("[TRANSACOES CONTROLLER] : EDITAR => " + error);

            res.status(500).send("Erro ao editar Transação!");
        }
    }
    
      static async ativarInativar(req, res) {
        try {
          let IdAtivarInativar = req.body;
          console.log(
            "[TRANSACOES CONTROLLER] : CHAMOU O MÉTODO ATIVAR/DESATIVAR TRANSAÇÃO" +
              "\n PARÂMETRO: " +
              JSON.stringify(IdAtivarInativar)
          );
          if (IdAtivarInativar._id == undefined) {
            res.send("Atributos insuficientes para a ação!");
          } else {
            let transacaoAtivarInativar = await Transacao.findById(IdAtivarInativar._id);
            transacaoAtivarInativar.ativo = !transacaoAtivarInativar.ativo;
            await Transacao.findByIdAndUpdate(IdAtivarInativar._id,transacaoAtivarInativar);
            res.status(200).json(transacaoAtivarInativar);
          }
        } catch (error) {
          console.log("[TRANSACAO CONTROLLER] : ATIVAR/DESATIVAR => " + error);
    
          res.status(500).send("Erro ao ativar ou inativar transcao!");
        }
      }

      static async deletarPorId(req, res) {
        try {
          let idDeletar = req.params.id;
    
          console.log(
            "[TRANSACOES CONTROLLER] : CHAMOU O MÉTODO DELETAR QUERY PARAM" +
              "\n PARÂMETRO: " +
              idDeletar
          );
    
          res.status(200).json(await Transacao.findByIdAndDelete(idDeletar));
        } catch (error) {
          console.log("[TRANSACOES CONTROLLER] : DELETAR => " + error);
    
          res.status(500).send("Erro ao deletar transacao!");
        }
      }
}

module.exports = TransacoesController