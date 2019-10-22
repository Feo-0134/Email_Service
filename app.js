'use strict';
const nodemailer = require('nodemailer');
const path = require("path");
const template = require("art-template");

async function renderTemplate() {
    return new Promise((resolve, reject) => {
        const html = template(path.join(__dirname, "index.html"),{});
        // console.log(html);
        resolve(html);
    });
}

// async..await is not allowed in global scope, must use a wrapper
async function main() {
    const html = await renderTemplate()
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        //host: 'smtp.163.email',
        service:'163',
        port: 465,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "", // generated ethereal user
            pass: "" // generated ethereal password
        }
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Feo" <frankdfrayoud34@163.com>', // sender address
        to: 'liang.fang@microsoft.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: html
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
