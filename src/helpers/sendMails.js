const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.API_SENDGRID)

const sendMail = async (msg) => {
    try {
        await sgMail.send(msg)
        console.log('Email enviado ok')
    } catch (error) {
        console.log(error)

        if(error.response){
            console.error(error.response.body)
        }
    }
}

module.exports = sendMail