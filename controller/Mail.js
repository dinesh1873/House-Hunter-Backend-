const express=require('express');
const Mail=express.Router();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'househounter2023@gmail.com',
      pass: 'iedb xpuw rrwb yfys'
    }
  });
Mail.post("/loginmail",(req,res)=>{
    const {name,email}=req.body;
    console.log(email);
      var mailOptions = {
        from: 'househounter2023@gmail.com',
        to: email,
        subject: 'Successfully Login to Your Account',
        html: '<h2>Hello '+name+'<h2/><p>At House Hunter, we understand the significance of your role and we are committed to providing you with the tools and support needed to succeed. Now You can add your property or You can latest selling properties</p>'+
        '<p><b>Best Regrads <b>'+'<br>'+'House Hunter'+'<br>'+'email:househounter2023@gmail.com'+'<p>'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
})
Mail.post("/signupmail",(req,res)=>{
    const {name,email}=req.body;
    console.log(email);
      var mailOptions = {
        from: 'househounter2023@gmail.com',
        to: email,
        subject: 'Welcome to Our House Hunter',
        html: '<div>'+'<h2>Hello '+name+'</h2>'+
        '<p>Welcome to House Hunter !  We are thrilled to have you as a valued member of our community. Your journey with us marks the beginning of a seamless and rewarding experience in the world of real estate.</p>'+
        '<p>Thank you for choosing House Hunter. We look forward to being a part of your success in the real estate market.</p>'+
        '<p>Best Regrads'+'<br>'+'House Hunter'+'<br>'+'email:househounter2023@gmail.com'+'<p>'+'</div>'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
})

module.exports=Mail;
