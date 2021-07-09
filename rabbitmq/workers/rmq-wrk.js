'use strict'

const amqp = require('amqplib')

const AMQP_URL = 'amqp://localhost'
const WRK_QUEUE = 'schedule_created_queue'
const EXCH_ORDER = 'schedule'

const main = async () => {
  const connection = await amqp.connect(AMQP_URL)
  const channel = await connection.createChannel()

  await Promise.all([
    channel.assertQueue(WRK_QUEUE, { durable: true }),
    channel.assertExchange(EXCH_ORDER, 'topic', { durable: true }),
  ])
  console.log('connected to rabbit mq and created queues and exchanges')

  channel.consume(
    WRK_QUEUE,
    async (msg) => {
      const data = JSON.parse(msg.content.toString())

      console.log(`[x] schedule received from queue ${WRK_QUEUE}`, data)

      console.log('process heavy task')
      await new Promise((resolve) => setTimeout(() => resolve(), 3000))
      console.log('heavy task processed')

      const payload = Buffer.from(JSON.stringify(data))

      channel.publish(EXCH_ORDER, 'schedule.created', payload)
      console.log(
        `[x] schedule published to exchange ${EXCH_ORDER} with topic schedule.created`
      )

      channel.ack(msg)
    },
    { noAck: false }
  )
}

main()
