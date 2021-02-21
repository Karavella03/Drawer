const express = require('express')
const app = express()
const http = require('http').Server(app)
const path = require('path')
const config = require('./config/config')
require('./socket')(http)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './src/index.html'))
})

app.use(express.static('src'))

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('500')
})

app.use((req, res) => {
    res.status(404).send('404')
})

http.listen(config.PORT, () => {
    console.log(`Server has been started on port: ${config.PORT}`)
})