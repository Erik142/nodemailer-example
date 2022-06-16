const nodemailer = require('nodemailer')
const fs = require('fs')
const path = require('path')

// E-mail server settings - replace with your settings
const emailServerHost = 'smtp-mail.outlook.com'
const emailServerPort = 587
const isEmailServerSecure = false // Set to false if sending from an @outlook.com email address
const emailServerUsername = 'my-email-address@outlook.com'
const emailServerPassword = 'MyVeryPrivatePassword'

// E-mail message settings
const emailSender = '"It\'s a meee, Mariooo" <my-email-address@outlook.com>' // IMPORTANT: Change the e-mail address to the same value as emailServerUsername above
const emailReceivers = 'LuigiMyBrother@gmail.com'


async function main() {

    let transporter = nodemailer.createTransport({
        host: emailServerHost,
        port: emailServerPort,
        secure: isEmailServerSecure,
        /* Only use together with @outlook.com e-mail addresses
        tls: {
            ciphers: 'SSLv3'
        },
        */
        auth: {
            user: emailServerUsername,
            pass: emailServerPassword
        }
    });

    let info = await transporter.sendMail({
        from: emailSender,
        to: emailReceivers,
        subject: "Look at this PDF file!!",
        attachments: {
            filename: 'sample.pdf',
            content: fs.readFileSync(path.join(__dirname, 'sample.pdf')),
            contentType: 'application/pdf'
        }
    });

    console.log("Message was successfully sent: %s", info.messageId);
}

main().catch(console.error)