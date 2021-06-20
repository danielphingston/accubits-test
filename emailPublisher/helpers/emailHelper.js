const nodemailer = require("nodemailer");

async function sendMail(data) {
    const transporter = await getTransport();
    try {
        let info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: data.email,
            subject: data.title,
            html: data.content,
        });
        console.log("News Letter Sent to", info.envelope.to);
    } catch (error) {
        throw error;
    }
}

async function getTransport() {
    let transport = await nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    return transport;
}

async function getGmailTransporter() {
    let gmailTransporter = await nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    return gmailTransporter;
}

module.exports = { sendMail };
