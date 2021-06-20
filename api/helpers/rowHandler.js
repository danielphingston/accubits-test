const rabbitMQ = require("./rabbitMQ");

const model = require("../models");
/**
 * @type {import("sequelize").ModelDefined<errorLog,errorLog>}
 ***/
const ErrorLogs = model["ErrorLogs"];

/**
 * @type {import("sequelize").ModelDefined<user,user>}
 ***/
const User = model["User"];

const queue = process.env.QUEUE_NAME;

async function handleRow(data, file, info) {
    const user = await getUserDetails(data.email);
    if (!user) {
        writeToErrorLog({
            status: "email not sent",
            reason: "user not found in db",
            file: file,
            row: info.records,
        });
        return;
    }
    const updatedData = {
        ...data,
        firstName: user["firstName"],
        lastName: user["lastName"],
    };
    rabbitMQ.sendToQueue(queue, { data: updatedData, file, info });
}

async function getUserDetails(email) {
    return await User.findOne({ where: { email: email } });
}

async function writeToErrorLog(data) {
    try {
        await ErrorLogs.create(data);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { writeToErrorLog, handleRow };
