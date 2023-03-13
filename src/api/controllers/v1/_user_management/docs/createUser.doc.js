
const createUser = {
    tags: ["Users"],
    description: "Create new user",
    requestBody: {
        content : {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            example: "Johny",
                        },
                        password: {
                            type: "string",
                            example: "SuperSecrtetPassword1337!@#",
                        },
                        mail: {
                            type: "string",
                            example: "sample@mail.com",
                        },
                        date_of_birth: {
                            type: "string",
                            example: "2022-01-01",
                        },                    
                    }
                }
            }
        }
    },
    responses: {
        200: {
            description: "OK",
        },
        400: {
            description: "Bad Request",
        }
    }
}



export const createUserDocs = {
    "/user" : { 
        post : createUser
    }
}