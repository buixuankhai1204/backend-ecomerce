const {Kafka, Partitioners} = require('kafkajs')
const consumerclass = require('../messageSyncQueue/consumer');
const redis = require('../../redis/chat/messageCache');


module.exports = class kafka {
    static async sendMessageToQueue(messageFrom, messageTo, content) {
        const kafka = this.getKafka();
        const producer = kafka.producer();

        await producer.connect();

        await producer.send({
            waitForLeaders: true,
            topic: `messageTo-${messageTo}`,
            messages: [
                {key: 'content', value: content, partition: 0},
                {key: 'messageFrom', value: messageFrom, partition: 1}
            ],
        })
        await producer.disconnect();
    }

    static getKafka() {
        return new Kafka({
            clientId: 'my-app',
            brokers: ['127.0.01:9092'],
        })
    }

    static async receiveMessageFromQueue(messageTo) {
        const kafka = this.getKafka();
        const consumer = kafka.consumer({groupId: 'my-group'})
        await consumer.connect();
        await consumer.subscribe({
            topic: `messageTo-${messageTo}`
        })
        await consumer.run({
            eachMessage: async ({topic, partition, message, heartbeat, pause, isRunning}) => {
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


