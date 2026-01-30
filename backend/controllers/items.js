const Item = require('../models/item')
const itemsRouter = require('express').Router()

// get all items
itemsRouter.get('/', (req, res, next) => {
    Item.find({})
    .then(items => {
        res.json(items)
    })
    .catch(error => next(error))
})

// post new item
itemsRouter.post('/', (req, res, next) => {
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
itemsRouter.delete('/:id', (req, res, next) => {
    Item.findByIdAndDelete(req.params.id)
    .then(result => {
        res.status(204).end()
    })
    .catch(error => next(error))
})

// put item
itemsRouter.put('/:id', (req, res, next) => {
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


module.exports = itemsRouter