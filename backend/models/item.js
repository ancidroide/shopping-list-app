const mongoose = require('mongoose')

// itemSchema creation
const itemSchema = new mongoose.Schema({
    name: String,
    amount: {
      type: Number,
      required: true,
      min: [1, 'quantità minima consentita: 1'],
      max: [999, 'quantità massima consentita: 999']
    },

    bought: Boolean,
    category: {
      type: String,
      required: true,
      default: 'Altro',
      enum: ['Frutta', 'Verdura', 'Carne', 'Pesce', 'Latticini', 'Casa', 'Altro']
    }
})

// Transform items when converted toJSON 
itemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Item', itemSchema)