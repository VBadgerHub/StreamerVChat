import userRepository from "../../repositories/userRepository.js"

export const getByName = async (name) =>{
    return await userRepository.getById(id)
}