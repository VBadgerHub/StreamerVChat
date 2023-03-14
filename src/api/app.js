import express from 'express';
import swaggerDoc from 'swagger-ui-express'
import { API_ROUTE, PORT } from '../utils/envConfigLoader.js';
import allAppRoutes from './controllers/index.js'
import {swaggerDocumentation} from '../utils/swagger.js'
import optionsRepository from '../repositories/optionsRepository.js';
import userRepository from '../repositories/userRepository.js';



const app = express();
app.use(express.json())

app.use('/docs', swaggerDoc.serve, swaggerDoc.setup(swaggerDocumentation))

const router = express.Router()  

allAppRoutes.map(routes => routes(router))  
app.use(`/${API_ROUTE}`, router) 
app.listen(PORT, () => { 
  console.log(`🔥 [server]: Server działa na porcie ${PORT}`);
  
}); 

// const usersData = [
//   {
//       name: 'user1',
//       password: 'TestPass1337@',
//       mail: 'test1@mail.vorczu.pl', 
//       date_of_birth: new Date()
//   },
//   {
//       name: 'user2',
//       password: 'TestPass1337@',
//       mail: 'test2@mail.vorczu.pl', 
//       date_of_birth: new Date()
//   },
//   {
//       name: 'user3',
//       password: 'TestPass1337@',
//       mail: 'test3@mail.vorczu.pl', 
//       date_of_birth: new Date()
//   },
//   {
//       name: 'user4',
//       password: 'TestPass1337@',
//       mail: 'test4@mail.vorczu.pl', 
//       date_of_birth: new Date()
//   }
// ]
// usersData.forEach(async user => {
//   await userRepository.add(user)  
  
// });

export default app








