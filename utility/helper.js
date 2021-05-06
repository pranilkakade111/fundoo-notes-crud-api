const joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const logger = require('../Logger/logger');
require('dotenv').config();

const requestValidationSchema = joi.object({
  firstName: joi.string().min(3).max(10).pattern(new RegExp('^[A-Z]{1}[a-z]{2,}$')).message('First letter Should be capital For first name').required(),
  lastName: joi.string().min(3).max(10).pattern(new RegExp('^[A-Z]{1}[a-z]{2,}$')).message('First letter Should be capital For last name').required(),
  email: joi.string().email().message('Email Should Be in Proper Manner').required(),
  password: joi.string().required(),
});

const createToken = (data) => {
  const token = jwt.sign({ name: data.name }, process.env.JWT, { expiresIn: '1h' });
  return token;
};

const nodeMail = (data) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const mailOption = {
    from: 'pranilkakade2@gmail.com',
    to: 'pranilkakade111@gmail.com',
    subject: 'Reset The Password',
    text: `http://localhost:3000/resetPassword/${createToken(data)}`,
  };

  transporter.sendMail(mailOption, (err, result) => {
    if (err) {
      logger.log('error', err);
    } else {
      logger.log('info', result);
    }
  });
};
module.exports = { requestValidationSchema, createToken, nodeMail };
