const joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const logger = require('../Logger/logger');
require('dotenv').config();

const requestValidationSchema = joi.object({
  firstName: joi.string().min(3).max(10).pattern(new RegExp('^[A-Z]{1}[a-z]{2,}$')).message('First letter Should be capital For first name').required(),
  lastName: joi.string().min(3).max(10).pattern(new RegExp('^[A-Z]{1}[a-z]{2,}$')).message('First letter Should be capital For last name').required(),
  email: joi.string().email().message('Email Should Be in Proper Manner').required(),
  password: joi.string().required(),
});

const createToken = (data) => {
  const token = jwt.sign({ data }, process.env.JWT, { expiresIn: '1d' });
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

  ejs.renderFile('app/view/nodeMail.ejs', (error, info) => {
    if (error) {
      logger.log('error', error);
    } else {
      const mailOption = {
        from: 'pranilkakade2@gmail.com',
        to: data.email,
        subject: 'Reset The Password',
        html: `${info}<button><a href="${'http://localhost:3000/resetPassword/'}${createToken(data)}">Button</a></button>`,
      };
      transporter.sendMail(mailOption, (err, result) => {
        if (err) {
          logger.log('error', err);
        } else {
          logger.log('info', result);
        }
      });
    }
  });
};
module.exports = { requestValidationSchema, createToken, nodeMail };
