const nodemailer = require("nodemailer");
const pendingData = require("../../memoryStore")
const dotenv = require('dotenv')

dotenv.config();


const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_HOST_PORT,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  },
  secure: true
});

const commonOption = {
  from: 'do_not_reply@northpole.com',
  to: 'santa@northpole.com',
  subject: 'Please check All Pending Wishes',
};

const getMailBody = () => {
  return {
    ...commonOption,
    text: pendingData.map(wish => JSON.stringify(wish)).join('\n')
  }
};

const send = () => {
  console.log(getMailBody());
  transporter.sendMail(getMailBody()).then(() => console.log('mail send success')).catch((e) => console.log(e));
};

module.exports = {
  send
};