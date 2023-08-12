const {Kafka, Partitioners} = require('kafkajs')
const consumerclass = require('../messageSyncQueue/consumer');
const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['127.0.01:9092'],
})
const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'my-group' })

module.exports = class kafka {
    static async  sendMessageToQueue(req, res, next) {
        await producer.connect();

        await producer.send({
            waitForLeaders: true,
            topic: `messageTo-${req.body.messageFrom}`,
            messages: [
                { key: 'content', value: req.body.content, partition: 0 },
                { key: 'messageFrom', value: req.body.messageFrom, partition: 1 }
            ],
        })

        await producer.disconnect();
        res.status(200).json(
            {
                status: "success",
                data: req.message,
                message: "gửi tin nhắn thành công !!!"
            }
        )
    }


    static async  receiveMessageFromQueue(messageTo) {
        await consumer.connect();
        await consumer.subscribe({
            topic:`messageTo-${messageTo}`
        })

        await consumer.run({
            eachMessage: async ({ topic, partition, message, heartbeat, pause, isRunning }) => {
                console.log({
                    topic,
                    partition: 1,
                    offset: message.offset,
                    value: message.value.toString(),
                });
            },
        });
    }
}


