const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')
app.use(cors())
app.use(express.json())

let items = [
  { id: 1, name: 'Latte', amount: 2, bought: false },
  { id: 2, name: 'Uova', amount: 6, bought: true },
  { id: 3, name: 'Pane', amount: 1, bought: false }
]

// get all items
app.get('/api/items', (req, res) => {
    res.json(items)
})

// post new item
app.post('/api/items', (req, res) => {
    const body = req.body
    const newItem = {
        id: Math.floor(Math.random() * 1000),
        name: body.name,
        amount: body.amount || 1,
        bought: body.bought || false
    }

    items = items.concat(newItem)
    res.status(201).json(newItem)
})

// delete item
app.delete('/api/items/:id', (req, res) => {
    items = items.filter(item => item.id !== Number(req.params.id))
    res.status(204).end()
})

// put item
app.put('/api/items/:id', (req, res) => {
    const id = Number(req.params.id)
    updatedObject = req.body

    items = items.map(item => item.id === id ? updatedObject : item)
    res.status(201).json(updatedObject)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})