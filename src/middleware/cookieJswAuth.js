import jwt from "jsonwebtoken"
import { USER_SECRET } from '../utils/envConfigLoader.js'

export const userLogout = (req, res, next ) =>{
    const token = req.cookies.token;
    try {
        const importer = jwt.verify(token, USER_SECRET )
        if (importer == null) {
            res.sendStatus(401)
        }
        
        res.clearCookie("token")
        next()
    } catch (error) {
        res.sendStatus(401)
        console.log(error.message);
    }
} 

export const userAuth = (req, res, next ) =>{
    const token = req.cookies.token;
    try {
        const importer = jwt.verify(token, USER_SECRET )
        if (importer == null) {
            res.sendStatus(401)
        } else {
            next()
        }
    } catch (error) { 
        res.sendStatus(401)
        console.log(error.message);
    }
} 
