require("dotenv").config(); //todo : remove only for testing
var amqp = require("amqplib");
const EventEmitter = require("events");
const url = `amqp://${process.env.AMQP_HOST}`;

class rabbitMQ extends EventEmitter {
    constructor() {
        super();
        amqp.connect(url)
            .then((connection) => {
                this.emit("connected");
                this.connection = connection;
                connection
                    .createChannel()
                    .then((channel) => {
                        this.channel = channel;
                        this.emit("channel-created");
                    })
                    .catch((err) => {
                        console.log(err);
                        throw err;
                    });
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    }

    async initializeQueue(queue) {
        if (!queue) {
            throw new Error("queue name is missing");
        }
        try {
            const value = await this.channel.assertQueue(queue, {
                durable: false,
            });
            return value;
        } catch (error) {
            throw error;
        }
    }
    /**
     *
     * @param {Object} message
     */
    sendToQueue(queue, message, retry = 3) {
        const status = this.channel.sendToQueue(
            queue,
            Buffer.from(JSON.stringify(message))
        );
        if (!status) {
            this.sendToQueue(status, retry - 1);
        }
    }
    /**
     *
     * @param {String} queue
     * @param {any} handleMessage
     * @param {amqp.Options.Consume} options
     */
    consumeMessage(queue, handleMessage, options) {
        this.channel.consume(queue, handleMessage, options);
    }
}

module.exports = new rabbitMQ();
