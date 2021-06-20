const { sendMail } = require("./emailHelper");
const rabbitMQ = require("./rabbitMQ");
const parkingLotQueue = process.env.PARKING_LOT_QUEUE;

const model = require("../models");

/**
 * @type {import("sequelize").ModelDefined<emailLog,emailLog>}
 ***/
const Logs = model["Logs"];

/**
 * @type {import("sequelize").ModelDefined<errorLog,errorLog>}
 ***/
const ErrorLogs = model["ErrorLogs"];

async function parkingLotHandler(msg) {
    const data = JSON.parse(msg.content.toString());
    // console.log("parkingLot", data.data);
}

async function sendNewsLetter(msg) {
    const data = JSON.parse(msg.content.toString());
    try {
        await sendMail(data.data);
        addToLog(data.data);
    } catch (error) {
        handleFailedEmail(error, data);
    }
}

function handleFailedEmail(error, data) {
    writeErrorToDB(error, data.file, data.info);
    addToParkingQueue(data);
}

function writeErrorToDB(error, file, info) {
    const log = {
        status: "Failed to send email",
        reason: error.message,
        file: file,
        row: info.records,
    };
    ErrorLogs.create(log);
}

function addToParkingQueue(data) {
    rabbitMQ.sendToQueue(parkingLotQueue, data);
}

module.exports = { parkingLotHandler, sendNewsLetter };
function addToLog(data) {
    const log = {
        email: data.email,
        newsletter: data.title,
    };
    Logs.create(log);
}
