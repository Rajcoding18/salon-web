const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Email configuration (Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // 
    pass: process.env.EMAIL_PASS    //
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'rajeev620024@gmail.com', // 
    subject: `New Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
