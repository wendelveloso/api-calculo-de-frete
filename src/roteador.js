const express = require('express')
const rotas = express()
const { listagemDeProdutos, consultaProdutoID, freteDoProduto } = require('./controladores/recurso-calculo-de-frete')


rotas.get('/produtos', listagemDeProdutos)
rotas.get('/produtos/:idProduto', consultaProdutoID)
rotas.get('/produtos/:idProduto/frete/:cep', freteDoProduto)

module.exports = rotas