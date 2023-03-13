import { PORT, API_ROUTE } from './envConfigLoader.js'
import { BASE_URL } from '../api/controllers/v1/_BaseUrl_v1.js'
import { sendMailDocs } from '../api/controllers/v1/_mail_management/docs/sendMail.doc.js'
import { createUserDocs } from '../api/controllers/v1/_user_management/docs/createUser.doc.js'


export const  swaggerDocumentation = {
      openapi: "3.0.0",
      info: {
        title: "VTicket CRUD REST API",
        version: "1.0.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger"
      },
      servers: [
        {
          url: `http://localhost:${PORT}/${API_ROUTE}/${BASE_URL}`,
          description: 'Development server'
        },
      ],
      tags:[
        {
            name: "Mail",
            description: "Mail system docs"
        },
        {
            name: "Users",
            description: "Users system"
        }
      ],
        paths: {
                ...sendMailDocs,
                ...createUserDocs,
        },
    apis: ['./src/api/controllers/v1/app_owner_management/*.js']
}


    
