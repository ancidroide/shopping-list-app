const express = require('express')
const app = express()
const cors = require('cors')
const itemsRouter = reqiore('../controllers/itemsRouter')
const config = require('../utils/config')
const logger = require('../utils/logger')
const middleware = require('../utils/middleware')
const mongoose = require('mongoose')

config.MONGODB_URI

app.use(cors)
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/items', itemsRouter)

middleware.end