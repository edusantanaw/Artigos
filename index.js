const express = require('express')
const cors = require('cors')
const app = express()
const home = require('./routes/routes')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(cors({ credentials: true, origin: 'http://localhost:8080'}))

app.use('/home', home)

app.listen(5000, ()=>{
    console.log('Programa iniciando...')
})