import userRepository from "../../repositories/userRepository.js"

export const getAllData = async () =>{
    return await userRepository.getById(id)
}