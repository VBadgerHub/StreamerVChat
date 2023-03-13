import { registerUser } from "../../../../_user_management/usecases/index.js"

const createUser = async (req, res) =>{  
    const response = await registerUser(req.body) 
    res.cookie(
        "token", response.jwt, {
            httpOnly: true
        }
    )        
    res.status(response.code).send(response.data)
}

const userLogout = async (req, res) => {
    res.clearCookie('token')
    res.sendStatus(302)
}

export default { 
    userLogout,
    createUser
} 