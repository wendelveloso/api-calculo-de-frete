const produtos = require("../bancodedados/colecao-produtos");
const { getStateFromZipcode } = require("utils-playground");

const listagemDeProdutos = (req, res) => {
  return res.status(200).json(produtos);
};
const consultaProdutoID = (req, res) => {
  const { idProduto } = req.params;
  const produtoDesejado = produtos.find((produto) => {
    return produto.id === Number(idProduto);
  });

  if (!produtoDesejado) {
    return res
      .status(404)
      .json({ mensagem: "Não existe produto com o ID informado." });
  }

  try {
    res.status(200).json(produtoDesejado);
  } catch (erro) {
    res.status(500).json(`Erro: ${erro.mensage}`);
  }
};
const freteDoProduto = async (req, res) => {
  const { idProduto, cep } = req.params;
  const produto = produtos.find((produto) => {
    return produto.id === Number(idProduto);
  });
  if (idProduto > produtos.length) {
    return res
      .status(404)
      .json({ mensagem: "Não existe produto com o ID informado." });
  }

  try {
    const estado = await getStateFromZipcode(cep);
    const frete = () => {
      if (
        estado === "BA" ||
        estado === "SE" ||
        estado === "AL" ||
        estado === "PE" ||
        estado === "PB"
      ) {
        return (produto.valor * 10) / 100;
      } else if (estado === "SP" || estado === "RJ") {
        return (produto.valor * 15) / 100;
      } else {
        return (produto.valor * 12) / 100;
      }
    };
    return res.status(201).json({ produto, estado: estado, frete: frete() });
  } catch (erro) {
    return res.status(500).json(`Erro: ${erro.message}`);
  }
};

module.exports = {
  listagemDeProdutos,
  consultaProdutoID,
  freteDoProduto,
};
