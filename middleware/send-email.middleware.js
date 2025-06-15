const nodemailer = require('nodemailer');
const pug = require('pug');
const path = require('path');
require('dotenv').config();

const sendEmail = async (book) => {
  try {
    const html = pug.renderFile(
      path.join(__dirname, '../views/bookCreated.pug'),
      {
        title: book.title,
        author: book.author,
        year: book.year || 'Unknown'
      }
    );

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const mailOptions = {
      from: `"Book API" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: '📚 New Book Created',
      html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${process.env.RECEIVER_EMAIL}`);

    const preview = nodemailer.getTestMessageUrl(info);
    if (preview) {
      console.log(`🔍 Preview URL: ${preview}`);
    }

  } catch (err) {
    console.error('❌ Failed to send email:', err.message);
  }
};

module.exports = sendEmail;
