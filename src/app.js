const express = require('express')
const cors = require('cors')
require('./db/mongoose')

const bookRouter = require('./routers/book')
const cartRouter = require('./routers/cart')
const userRouter = require('./routers/user')
const adminRouter = require('./routers/admin')

const routers = [bookRouter, cartRouter, userRouter, adminRouter]

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('ok')
})

app.use(routers)

module.exports = app
