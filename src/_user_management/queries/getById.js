import userRepository from "../../repositories/userRepository.js"

export const getById = async (id) =>{
    return await userRepository.getById(id)
}