const Mongoose = require("mongoose");
const Empresa = Mongoose.model("Empresa");

class EmpresaController {
  static async buscarTodos(req, res) {
    console.log("[EMPRESA CONTROLLER] : CHAMOU O MÉTODO BUSCAR TODOS");
    try {
      res.json(await Empresa.find({}));
    } catch (error) {
      console.log("[EMPRESA CONTROLLER] : buscarTodos => " + error);
      res.status(500).send("Erro ao buscar empresas!");
    }
  }

  static async adicionar(req, res) {
    try {
      let empresaNova = req.body;
      console.log(
        "[EMPRESA CONTROLLER] : CHAMOU O MÉTODO ADICIONAR" +
          "\n PARÂMETRO: " +
          JSON.stringify(empresaNova)
      );
      res.status(201).json(await Empresa.create(empresaNova));
    } catch (error) {
      res.status(500).send("Erro ao inserir nova empresa: " + error);
    }
  }

  static async editar(req, res) {
    try {
      let empresaEditar = req.body;

      console.log(
        "[EMPRESA CONTROLLER] : CHAMOU O MÉTODO EDITAR" +
          "\n PARÂMETRO: " +
          JSON.stringify(empresaEditar)
      );

      const { _id, empresa, cnpj, email, telefone } = req.body;

      const existeEmpresa = await Empresa.findOne({ _id });

      if (!existeEmpresa) {
        return res.status(400).json({ error: "Empresa não existe" });
      }

      await existeEmpresa.updateOne({
        empresa,
        cnpj,
        email,
        telefone,
      });

      return res.json(empresaEditada);
    } catch (error) {
      console.log("[EMPRESA CONTROLLER] : EDITAR => " + error);

      res.status(500).send("Erro ao editar empresa!");
    }
  }

  static async inativar(req, res) {
    try {
      const { _id } = req.params;
      const empresaInativar = req.body;

      console.log(
        "[EMPRESA CONTROLLER] : CHAMOU O MÉTODO INATIVAR" +
          "\n PARÂMETRO: " +
          JSON.stringify(empresaInativar)
      );

      const existeEmpresa = await Empresa.findOne({
        _id,
      });

      if (!existeEmpresa) {
        return res.status(400).json({ error: "Empresa não existe" });
      }

      await existeEmpresa.updateOne({
        ativo: false,
      });

      return res.json(existeEmpresa);
    } catch (error) {
      console.log("[EMPRESA CONTROLLER] : INATIVAR => " + error);

      res.status(500).send("Erro ao inativar empresa!");
    }
  }

  // Início Metodos Produtos e Serviços
  static async buscarTodosProdutosServicosPorId(req, res) {
    try {
      let _idEmpresa = req.params.id;

      console.log(
        "[EMPRESA CONTROLLER] : CHAMOU O MÉTODO BUSCAR TODOS PRODUTOS SERVICOS POR ID QUERY PARAM" +
          "\n PARÂMETRO: " +
          _idEmpresa
      );
      const empresa = await Empresa.findById(_idEmpresa);
      res.status(200).json(empresa.produtosServicos);
    } catch (error) {
      console.log(
        "[EMPRESA CONTROLLER] : BUSCAR TODOS PRODUTOS SERVICOS POR ID QUERY PARAM => " +
          error
      );

      res.status(500).send("Erro ao buscar todos os Produtos e Serviços!");
    }
  }

  static async adicionarProdutoServico(req, res) {
    try {
      const pacoteEmpresaNovoProdutoServico = req.body;
      const _idEmpresa = pacoteEmpresaNovoProdutoServico._idEmpresa;
      const novoProdutoServico =
        pacoteEmpresaNovoProdutoServico.novoProdutoServico;

      console.log(
        "[EMPRESA CONTROLLER] : CHAMOU O MÉTODO ADICIONAR PRODUTO SERVICO" +
          "\n PARÂMETRO: " +
          JSON.stringify(pacoteEmpresaNovoProdutoServico)
      );

      console.log(JSON.stringify(novoProdutoServico));
      const existeEmpresa = await Empresa.findById(_idEmpresa);

      if (!existeEmpresa) {
        return res.status(400).json({
          error:
            "Não é possível incluir esse Produto/Serviço pois a empresa informada não existe!",
        });
      } else if (
        novoProdutoServico.nome == undefined ||
        novoProdutoServico.tipo == undefined ||
        novoProdutoServico.valor == undefined ||
        novoProdutoServico.descricao == undefined ||
        novoProdutoServico.ativo == undefined
      ) {
        res
          .status(200)
          .send("Atributos de Produto/Serviço insuficientes para a ação!");
      } else {
        novoProdutoServico._id = Mongoose.Types.ObjectId();
        existeEmpresa.produtosServicos.push(novoProdutoServico);
        await Empresa.findByIdAndUpdate(existeEmpresa._id, existeEmpresa);
        res.status(200).json(existeEmpresa);
      }
    } catch (error) {
      console.log(
        "[EMPRESA CONTROLLER] : ADICIONAR PRODUTO SERVICO => " + error
      );
      res.status(500).send("Erro ao adicionar novo Produto/Serviço!");
    }
  }

  static async editarProdutoServico(req, res) {
    try {
      const pacoteEmpresaEditaProdutoServico = req.body;
      const _idEmpresa = pacoteEmpresaEditaProdutoServico._idEmpresa;
      const produtoServicoEditado =
        pacoteEmpresaEditaProdutoServico.produtoServicoEditado;

      console.log(
        "[EMPRESA CONTROLLER] : CHAMOU O MÉTODO EDITAR PRODUTO SERVICO" +
          "\n PARÂMETRO: " +
          JSON.stringify(pacoteEmpresaEditaProdutoServico)
      );

      const existeEmpresa = await Empresa.findById(_idEmpresa);
      const existeProdutoServico = function () {
        let i = 0;
        while (i <= existeEmpresa.produtosServicos.length - 1) {
          if (
            produtoServicoEditado._id == existeEmpresa.produtosServicos[i]._id
          ) {
            return true;
          }
          i++;
        }
        return false;
      };

      if (!existeEmpresa) {
        res
          .status(200)
          .send(
            "Não é possível editar esse Produto/Serviço pois a empresa informada não existe!"
          );
      } else if (!existeProdutoServico) {
        res
          .status(200)
          .send("Não é possível editar, Produto/Serviço informado não existe!");
      } else if (
        produtoServicoEditado._id == undefined ||
        produtoServicoEditado.nome == undefined ||
        produtoServicoEditado.tipo == undefined ||
        produtoServicoEditado.valor == undefined ||
        produtoServicoEditado.descricao == undefined ||
        produtoServicoEditado.ativo == undefined
      ) {
        res
          .status(200)
          .send("Atributos de Produto/Serviço insuficientes para a ação!");
      } else {
        let stop = false;
        let i = 0;
        while (
          stop == false &&
          i <= existeEmpresa.produtosServicos.length - 1
        ) {
          if (
            produtoServicoEditado._id == existeEmpresa.produtosServicos[i]._id
          ) {
            existeEmpresa.produtosServicos[i] = produtoServicoEditado;
            stop = true;
          }
          if (stop == false) {
            i++;
          }
        }
        await Empresa.findByIdAndUpdate(existeEmpresa._id, existeEmpresa);
        res.status(200).json(existeEmpresa.produtosServicos[i]);
        console.log(existeEmpresa.produtosServicos[i]);
      }
    } catch (error) {
      console.log("[EMPRESA CONTROLLER] : EDITAR PRODUTO SERVICO => " + error);
      res.status(500).send("Erro ao adicionar novo Produto/Serviço!");
    }
  }

  static async ativarInativarProdutoServico(req, res) {
    try {
      const idsEmpresaEProdutoServico = req.body;
      const _idEmpresa = idsEmpresaEProdutoServico._idEmpresa;
      const _idProdutoServico = idsEmpresaEProdutoServico._idProdutoServico;
      console.log(
        "[EMPRESA CONTROLLER] : CHAMOU O MÉTODO ATIVARINATIVAR PRODUTO SERVICO" +
          "\n PARÂMETRO: " +
          JSON.stringify(idsEmpresaEProdutoServico)
      );

      const existeEmpresa = await Empresa.findById(_idEmpresa);
      let existeProdutoServico = undefined;
      let stopExisteProdutoServico = false;
      let k = 0;
      while (
        stopExisteProdutoServico == false &&
        k <= existeEmpresa.produtosServicos.length - 1
      ) {
        if (_idProdutoServico == existeEmpresa.produtosServicos[k]._id) {
          existeProdutoServico = existeEmpresa.produtosServicos[k];
          stopExisteProdutoServico = true;
        }
        k++;
      }

      console.log(existeProdutoServico);

      if (!existeEmpresa) {
        res
          .status(200)
          .send(
            "Não é possível ativar/inativar esse Produto/Serviço pois a empresa informada não existe!"
          );
      } else if (!existeProdutoServico) {
        res
          .status(200)
          .send(
            "Não é possível ativar/inativar, Produto/Serviço informado não existe!"
          );
      } else if (
        existeProdutoServico._id == undefined ||
        existeProdutoServico.nome == undefined ||
        existeProdutoServico.tipo == undefined ||
        existeProdutoServico.valor == undefined ||
        existeProdutoServico.descricao == undefined ||
        existeProdutoServico.ativo == undefined
      ) {
        res
          .status(200)
          .send("Atributos de Produto/Serviço insuficientes para a ação!");
      } else {
        existeProdutoServico.ativo = !existeProdutoServico.ativo;
        await Empresa.findByIdAndUpdate(existeEmpresa._id, existeEmpresa);
        res.status(200).json(existeProdutoServico);
        console.log(existeProdutoServico);
      }
    } catch (error) {
      console.log(
        "[EMPRESA CONTROLLER] : ATIVARINATIVAR PRODUTO SERVICO => " + error
      );
      res.status(500).send("Erro ao ativar ou inativar Produto/Serviço!");
    }
  }

  //***************************************************************
  // static async deleteProdutoServicoSemId(req, res) {
  //   try {
  //     const _idEmpresa = req.body._idEmpresa;

  //     console.log(
  //       "[EMPRESA CONTROLLER] : CHAMOU O MÉTODO DELETE PRODUTO SERVICO SEM ID" +
  //         "\n PARÂMETRO: " +
  //         JSON.stringify(_idEmpresa)
  //     );

  //     console.log("1");
  //     const existeEmpresa = await Empresa.findById(_idEmpresa);
  //     let deletados = [];
  //     console.log("2");
  //     if (existeEmpresa) {
  //       for (
  //         let index = 0;
  //         index < existeEmpresa.produtosServicos.length;
  //         index++
  //       ) {
  //         if (existeEmpresa.produtosServicos[index]._id == undefined) {
  //           deletados.push(existeEmpresa.produtosServicos.splice(index, 1));
  //         }
  //         console.log(index);
  //       }
  //     }
  //     await Empresa.findByIdAndUpdate(_idEmpresa, existeEmpresa);
  //     res.status(200).json(deletados);
  //   } catch (error) {
  //     console.log("[EMPRESA CONTROLLER] : DELETE PRODUTO SERVICO => " + error);
  //     res.status(500).send("Erro ao deletar Produto/Serviço!");
  //   }
  // }
  //***************************************************************

  // Fim    Metodos Produtos e Serviços

  // METODOS PARA MENSAGENS
  static async buscarMensagens(req, res) {
    console.log("[EMPRESA CONTROLLER] : CHAMOU O MÉTODO BUSCAR MENSAGENS");
    try {
      res.json(await Empresa.find({}, { "mensagens:": 1 }));
    } catch (error) {
      console.log("[EMPRESA CONTROLLER] : buscando Mensagens => " + error);
      res.status(500).send("Erro ao buscar mensagens!");
    }
  }

  static async adicionarMensagens(req, res) {
    try {
      let mensagemNova = req.body;
      console.log(
        "[EMPRESA CONTROLLER] : CHAMOU O MÉTODO ADICIONAR" +
          "\n PARÂMETRO: " +
          JSON.stringify(mensagemNova)
      );
      res.status(201).json(await Empresa.create(mensagemNova));
    } catch (error) {
      res.status(500).send("Erro ao inserir nova empresa: " + error);
    }
  }
  //FIM DO METODO PARA MENSAGENS
}

module.exports = EmpresaController;
