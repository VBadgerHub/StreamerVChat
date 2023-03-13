import {registerUser} from '../../../../_user_management/usecases/index.js'

import { getById, getByName, getAllData } from '../../../../_user_management/queries/index.js'

const add = async (req, res) =>{  
    const response = await registerUser(req.body) 
    res.cookie(
        "token", response.jwt, {
            httpOnly: true
        }
    )        
    res.status(response.code).send(response.respData)
}

const getUserById = async (req, res) =>{  
    const response = await getById(req.params.id)      
    res.status(response.code).send(response.respData)
}

const getUserByName = async (req, res) =>{  
    const response = await getByName(req.params.name)       
    res.status(response.code).send(response.respData)
}

const getallUsers = async (req, res) =>{  
    const response = await getAllData()        
    res.status(response.code).send(response.respData)
}


export default { 
    getUserById,
    getUserByName,
    getallUsers,
    add
} 