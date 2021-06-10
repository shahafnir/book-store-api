const app = require('./app')

const port = process.env.PORT

app.use('/', (req, res) => {
    res.send()
})

app.listen(port, () => {
    console.log(`Sever is up on port ${port}`)
})
