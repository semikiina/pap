var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tagmetheapp@gmail.com',
      pass: 'azqltpjvwsbwcqit'
    }
  });

module.exports= transporter;