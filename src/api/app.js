import express from 'express';
import swaggerDoc from 'swagger-ui-express'
import { API_ROUTE, PORT } from '../utils/envConfigLoader.js';
import allAppRoutes from './controllers/index.js'
import {swaggerDocumentation} from '../utils/swagger.js'



const app = express();
app.use(express.json())

app.use('/docs', swaggerDoc.serve, swaggerDoc.setup(swaggerDocumentation))

const router = express.Router()  

allAppRoutes.map(routes => routes(router))  
app.use(`/${API_ROUTE}`, router) 
app.listen(PORT, () => { 
  console.log(`🔥 [server]: Server działa na porcie ${PORT}`);
  
}); 

export default app








