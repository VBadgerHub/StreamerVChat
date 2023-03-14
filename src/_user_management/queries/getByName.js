import userRepository from "../../repositories/userRepository.js"

export const getByName = async (name) =>{
    let res = await userRepository.getByName(name)
    return {code: 200, data: res}
}