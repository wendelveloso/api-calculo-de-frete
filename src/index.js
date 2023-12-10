const express = require('express')
const app = express()
const rotas = require('./roteador')

app.use(rotas)
app.use(express.json())
app.listen(3000)