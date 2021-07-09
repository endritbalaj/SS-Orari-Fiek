'use strict'

const amqp = require('amqplib')
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const PORT = parseInt(process.env.PORT)
const AMQP_URL = 'amqp://localhost'
const WRK_QUEUE = 'schedule_created_queue'
const UPD_QUEUE = 'schedule_updated_queue'
const DEL_QUEUE = 'schedule_deleted_queue'

const app = express()
/** @type {amqp.Channel} */
let channel = null

// app.use(corsMiddleware);

app.use(cors())
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  next()
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ strict: true }))

app.post('/api/schedule', (req, res) => {
  try {
    const id = parseInt(req.params.id)

    const schedules = req.body
    for (const schedule of schedules) {
      const { email, title, professor, date } = schedule

      const classEvent = { email, title, professor, date }
      const payload = Buffer.from(JSON.stringify(classEvent))
      channel.sendToQueue(WRK_QUEUE, payload, { persistent: true })
      console.log('[x] published schedule to queue %s', WRK_QUEUE)
    }

    res.status(200).json({ success: true })
  } catch (error) {
    console.log(error)
  }
})

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.statusCode = 404
  next(err)
})

app.use((err, req, res, next) => {
  const code = err.statusCode || 500
  const msg = err.message || 'Internal Server Error'
  res.status(code).json({ error: msg })
})

const start = async () => {
  const connection = await amqp.connect(AMQP_URL)
  channel = await connection.createChannel()
  await channel.assertQueue(WRK_QUEUE, { durable: true })

  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
  })
}

start()
