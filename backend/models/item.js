const url = process.env.MONGODB_URI
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)
    .then(result => {
        console.log('Connesso a MongoDB')
    })
    .catch(error => {
        console.log('Errore di connessione a MongoDB:', error.message)
    })


const itemSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    bought: Boolean,
})

itemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Item', itemSchema)