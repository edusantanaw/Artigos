const express = require('express')
const cors = require('cors')
const app = express()
const articles = require('./routes/articleRoutes')
const user = require('./routes/userRoutes')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors({ credentials: true, origin: 'http://localhost:3000'}))
app.use(express.static('public'))
app.use('/article', articles)
app.use('/user', user)

app.listen(5000, ()=>{
    console.log('Programa iniciando...')
})