const express = require('express')
const app = express()
const port = 3001
require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)
const cors = require('cors')
app.use(cors())
app.use(express.json())

const itemSchema = new mongoose.Schema({
    name: String,
    amount: String,
    bought: Boolean,
})

itemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Item = mongoose.model('Item', itemSchema);

// get all items
app.get('/api/items', (req, res) => {
    Item.find({}).then(items => {
        res.json(items)
    })
})

// post new item
app.post('/api/items', (req, res) => {
    const body = req.body
    const item = new Item({
        name: body.name,
        amount: body.amount || 1,
        bought: body.bought || false,
    })

    item.save().then(savedItem => {
        res.json(savedItem) 
    })
})

// delete item
app.delete('/api/items/:id', (req, res) => {
    Item.findByIdAndDelete(req.params.id).then(result => {
        res.status(204).end()
    })
})

// put item
app.put('/api/items/:id', (req, res) => {
    const body = req.body

    const item = {
        name: body.name,
        amount: body.amount,
        bought: body.bought
    }

    Item.findByIdAndUpdate(req.params.id, item, { new: true} )
        .then(updatedItem => {
            res.json(updatedItem)
    })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})