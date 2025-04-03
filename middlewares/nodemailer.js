const nodemailer=require('nodemailer');

const transipoter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASS
    }
})

module.exports={transipoter}