const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const itemsRouter = require('./controllers/items')

const app = express()

logger.info(`Connecting to: ${config.MONGODB_URI}`)
mongoose
    .connect(config.MONGODB_URI, { family: 4 })
    .then(result => { 
        logger.info(`Connected to MongoDB`)
    })
    .catch(error => {
        logger.error(error.message)
    })

// Middleware
app.use(express.static('dist')) // To serve static file (Frontend)
app.use(express.json()) // Parsing JSON
app.use(middleware.requestLogger) // Requests logger

// Router
app.use('/api/items', itemsRouter) // Mount router items

// Error Middleware
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app