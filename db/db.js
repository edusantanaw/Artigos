const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/myPosts')
    .then(
        console.log('Conectado com sucesso ao MongoDB!')
    ).catch((err) => {
        console.log(err)
    })

module.exports = mongoose