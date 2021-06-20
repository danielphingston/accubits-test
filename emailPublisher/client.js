require("dotenv").config();

const rabbitMQ = require("./helpers/rabbitMQ");
const { sendNewsLetter, parkingLotHandler } = require("./helpers/queueHelpers");

const queue = process.env.QUEUE_NAME;
const parkingLotQueue = process.env.PARKING_LOT_QUEUE;

rabbitMQ.on("channel-created", (mq) => {
    rabbitMQ
        .initializeQueue(queue)
        .then(() => {
            console.log(`listening to ${queue}`);
            rabbitMQ.consumeMessage(queue, (msg) => sendNewsLetter(msg), {
                noAck: true,
            });
        })
        .catch((err) => {
            console.log(err);
        });

    rabbitMQ
        .initializeQueue(parkingLotQueue)
        .then(() => {
            console.log(`listening to ${parkingLotQueue}`);
            rabbitMQ.consumeMessage(
                parkingLotQueue,
                (msg) => parkingLotHandler(msg),
                { noAck: true }
            );
        })
        .catch((err) => {
            console.log(err);
        });
});
