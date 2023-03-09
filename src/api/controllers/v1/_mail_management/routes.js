import { Router } from 'express';
import { BASE_URL } from '../_BaseUrl_v1.js';
import mailController from './controllers.js'

export default (router ) =>{ 
    router.post(`${BASE_URL}/sendMail`, mailController.mailSender);
}