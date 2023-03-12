import { registerUser } from "../../../../_user_management/usecases/index.js"

const createUser = async (req, res) =>{  
    const response = await registerUser(req.body) 
    res.status(response.code).send(response.msg)
}

export default { 
    createUser
} 