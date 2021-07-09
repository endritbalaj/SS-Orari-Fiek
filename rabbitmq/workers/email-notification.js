'use strict'

const amqp = require('amqplib')
const sgMail = require('@sendgrid/mail')
require('dotenv').config()

const AMQP_URL = 'amqp://localhost'
const ORDER_EXCHANGE = 'schedule'
const SENDGRID_API_KEY = process.env.SENDGRID_KEY
const TOPICS = ['schedule.created', 'schedule.updated', 'schedule.canceled']

const main = async () => {
  const connection = await amqp.connect(AMQP_URL)
  const channel = await connection.createChannel()

  const q = await channel.assertQueue('', { exclusive: true })

  await channel.assertExchange(ORDER_EXCHANGE, 'topic', { durable: true })

  for (const topic of TOPICS) {
    await channel.bindQueue(q.queue, ORDER_EXCHANGE, topic)
  }

  channel.consume(q.queue, async (msg) => {
    const raw = JSON.parse(msg.content)

    const topic = msg.fields.routingKey

    sgMail.setApiKey(SENDGRID_API_KEY)

    let subject = 'Event'
    if (topic === 'schedule.created') subject = `${raw.title} has been Created`
    if (topic === 'schedule.updated') subject = `${raw.title} has been Updated`
    if (topic === 'schedule.deleted') subject = `${raw.title} has been Deleted`

    const text = `Profesori: ${raw.professor},\nData: ${raw.date}!`

    const email = raw.email

    const mailMsg = {
      to: email,
      from: process.env.SENDER_MAIL,
      subject,
      text,
    }

    await sgMail.send(mailMsg)
    console.log('event sent')
  })
}

main().catch(console.error())
