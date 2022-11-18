var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lokashopify@gmail.com',
    pass: 'hqtlpyjgunrvobsu'
  }
});
  
const sendMail = (mailOptions) => {
    transporter.sendMail({...mailOptions,from:"lokashopify@gmail.com"}, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    })
};

module.exports = {transporter,sendMail};