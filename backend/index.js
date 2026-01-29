require('dotenv').config()
const express = require('express')
const app = express()
const Item = require('./models/item')

const cors = require('cors')
app.use(cors())
app.use(express.json())


// get all items
app.get('/api/items', (req, res, next) => {
    Item.find({})
    .then(items => {
        res.json(items)
    })
    .catch(error => next(error))
})

// post new item
app.post('/api/items', (req, res, next) => {
    const body = req.body
    const item = new Item({
        name: body.name,
        amount: body.amount || 1,
        bought: body.bought || false,
    })

    item.save()
    .then(savedItem => {
        res.json(savedItem) 
    })
    .catch(error => next(error))
})

// delete item
app.delete('/api/items/:id', (req, res, next) => {
    Item.findByIdAndDelete(req.params.id)
    .then(result => {
        res.status(204).end()
    })
    .catch(error => next(error))
})

// put item
app.put('/api/items/:id', (req, res, next) => {
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
    .catch(error => next(error))
})

// uknown end route
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// error handler
const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})