
const sendMail = {
    tags: ["Mail"],
    description: "Send mail to Vorczu :)",
    requestBody: {
        content : {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        subject: {
                            type: "string",
                            example: "Hello form DOCS",
                        },
                        text: {
                            type: "string",
                            example: "Execute order 66",
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



export const sendMailDocs = {
    "/sendMail" : { 
        post : sendMail
    }
}