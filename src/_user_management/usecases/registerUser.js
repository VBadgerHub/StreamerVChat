import jwt  from "jsonwebtoken"
import { USER_SECRET } from "../../utils/envConfigLoader.js";
import userRepository from "../../repositories/userRepository.js";
import optionsRepository from "../../repositories/optionsRepository.js";
import { passwordHash } from "../../utils/bcrypt.js";


export const registerUser = async (user) =>{

    const userValidate = isUserValid(user)
    if (!userValidate.result) {
        const respData = { msg: userValidate.msgArr, data: user}
        return { code: 400, respData} 
    }
 
    try { 
        const responseUser = await userRepository.add(await passwordHash(user))
        const userSessionTime = await optionsRepository.getByName('UserSessionTime')
        const generateToken = jwt.sign({user: 'mailer'}, USER_SECRET, {expiresIn: userSessionTime.option_value})
        const respData = { msg: 'User registered successfully', data: userDTO(responseUser)}
        
        return { code: 200, respData, jwt: generateToken}

    } catch (error) {
        if (error.code == 'P2002') {
            if (error.meta.target == 'users_mail_key') {
                const respData = { msg: 'Mail already used', data: []}
                return { code: 400, respData}                
            }
        }
        console.log(error);
        return { code: 500, msg: 'Unknow Error'} 
    }

}

const isUserValid = (user) =>{

    const userValid = isUserDataValid(user)
    const pwValid = isPasswordValid(user.password)
    const nameValid = isNameValid(user.name)
    const mailValid = isEmailValid(user.mail)
    

    let validateArr = [
        pwValid,
        nameValid,
        mailValid,
        userValid
    ]   
    
    let errorArr = []
    let userObjError = false

    validateArr.forEach(userData => {
        if (!userData.result) {
            userObjError = true
            errorArr = [...errorArr, userData.msg]
        } 
    });

    return userObjError ? { result: false, msgArr: errorArr} : { result: true} 
}
 

const isUserDataValid = (user) =>{ 
    return user ? { result: true } : { result: false, msg: 'Not valid user object' }
}

const isNameValid = (name) =>{ 
    return (name && typeof name == 'string' && name.length > 4 && name != null) ? { result: true } :   { result: false, msg: 'Name is not valid' }
}

const isPasswordValid = (password) =>{
    let regex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    return regex.test(password) ? { result: true } : { result: false, msg: 'Password is not valid' }
}

const isEmailValid = (mail) =>{
    let regex = new RegExp(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)
    return regex.test(mail) ? { result: true } : { result: false, msg: 'Mail is not valid' }
}

const userDTO = (user) => {
    return {
        id: user.id,
        name: user.name,
        mail: user.mail
    }
}
