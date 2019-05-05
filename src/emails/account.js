const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email,name) => {

    sgMail.send({
        to:email,
        from:'srikanthsree1232@gmail.com',
        subject:'thanks for joining us',
        text:`welcome to our site ${name}`
    })
}

module.exports = {
 sendWelcomeEmail
}

const sendCancelationEmail = (email,name) => {

    sgMail.send({
        to:email,
        from:'srikanthsree1232@gmail.com',
        subject:' canceling email',
        text:`you will be unsubscribed from our service emails ${name} `
    })
}

module.exports = {
 sendCancelationEmail
}