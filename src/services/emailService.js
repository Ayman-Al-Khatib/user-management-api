const nodemailer = require('nodemailer');
const fs = require('fs');
module.exports = async ({
  fromEmail = process.env.FROM_EMAIL,
  toEmail,
  verificationCode,
  subject = 'Verify your email',
}) => {
  const emailTemplate = fs.readFileSync('src/views/email/emailTemplate.html', 'utf8');

  const emailContent = emailTemplate.replace('{{verificationCode}}', verificationCode);

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: fromEmail,
    to: toEmail,
    subject: subject,
    html: emailContent,
  };

  return await transporter.sendMail(mailOptions);
};
