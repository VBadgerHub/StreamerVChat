import nodemailer from 'nodemailer';
import { MAIL_USER, MAIL_PASS, MAIL_HOST } from '../utils/envConfigLoader.js';

export const mailer = nodemailer.createTransport({
    host: MAIL_HOST,
    port: 587, 
    secure: false,
    auth: {
        user: MAIL_USER, 
        pass: MAIL_PASS
    },
    requireTLS: true, 
    tls: {
        rejectUnauthorized: false
      }
  });

  









  

