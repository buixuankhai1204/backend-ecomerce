const {Kafka, Partitioners} = require('kafkajs')
const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['127.0.01:9092'],
})
const consumer = kafka.consumer({ groupId: 'my-group' })
module.exports = class consumerclass {

    static async  receiveMessageFromQueue(messageFrom, messageTo) {
        await consumer.connect();
        await consumer.subscribe({
            topic:`messageFrom-messageTo-${messageFrom}-${messageTo}`
        })

        await consumer.run({
            eachMessage: async ({ topic,  message }) => {
                console.log({
                    topic,
                    offset: message.offset,
                    value: message.value.toString(),
                });
            },
        });
    }
}

