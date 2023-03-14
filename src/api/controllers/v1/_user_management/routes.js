import { BASE_URL } from '../_BaseUrl_v1.js';
import userController from './controller.js' 

export default (router ) =>{ 
    router.post(`${BASE_URL}/user`, userController.add);
    router.get(`${BASE_URL}/user/id/:id`, userController.getUserById);
    router.get(`${BASE_URL}/user/name/:name`, userController.getUserByName);
    router.get(`${BASE_URL}/user`, userController.getallUsers);
}