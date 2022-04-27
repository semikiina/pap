var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tagmetheapp@gmail.com',
      pass: 'Portugal2019!'
    }
  });

module.exports= transporter;