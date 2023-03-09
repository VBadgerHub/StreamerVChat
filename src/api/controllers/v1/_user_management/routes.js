import { BASE_URL } from '../_BaseUrl_v1.js';
import userController from './controller.js' 

export default (router ) =>{ 
    router.post(`${BASE_URL}/user`, userController.createUser);
}