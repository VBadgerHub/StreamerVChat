import userRepository from "../../repositories/userRepository.js";



export const registerUser = async (user) =>{

    const userValidate = isUserValid(user)
    if (!userValidate.result) {
        return { code: 400, msg: userValidate.msgArr} 
    }
 
    try { 
        const responseUser = await userRepository.add(user)
        return { code: 200, msg: 'User registered successfully', data: responseUser}
    } catch (error) {
        if (error.code == 'P2002') {
            if (error.meta.target == 'users_mail_key') {
                return { code: 400, msg: 'Mail already used'}                
            }
        }
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

const isUserObjectValid = () => {

}

// !user                                   ||
// Object.keys(user).length < 1            ||