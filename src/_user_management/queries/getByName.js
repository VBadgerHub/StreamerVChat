import userRepository from "../../repositories/userRepository.js"

export const getByName = async (name) =>{
    if (!isNameValid(name)) {
        return {code: 400, data: {}, msg: 'User name is not valid type'}
    }

    let res = await userRepository.getByName(name)
    if(!res){
        return {code: 404, data: {}, msg: `No user by name ${name} `}
    }
    let userDTO =  {
        id: res.id,
        name: res.name,
        mail: res.mail
    }

    return {code: 200, data: userDTO}
} 


const isNameValid = (name) => {
    return typeof name == 'string' && name.length > 3 ? true : false
}