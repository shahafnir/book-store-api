const express = require('express')
const cors = require('cors')
require('./db/mongoose')

const bookRouter = require('./routers/book')

const routers = [bookRouter]

const app = express()

app.use(cors())
app.use(express.json())
app.use(routers)

module.exports = app
