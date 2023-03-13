import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;
export const API_ROUTE = process.env.API_ROUTE;

export const MAIL_USER = process.env.MAIL_USER;
export const MAIL_TARGET = process.env.MAIL_TARGET;
export const MAIL_PASS = process.env.MAIL_PASS;
export const MAIL_PORT = process.env.MAIL_PORT;
export const MAIL_HOST = process.env.MAIL_HOST;
export const MAIL_SECURE = process.env.MAIL_SECURE;
export const MAIL_SENDER_ON = process.env.MAIL_SENDER_ON;

export const USER_SECRET = process.env.USER_SECRET;

