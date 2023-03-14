import userRepository from "../../repositories/userRepository.js"

export const getAllData = async () =>{
    const response = await userRepository.getAll()
    let userDTO = []
    response.forEach(DBUser => {
        userDTO = [...userDTO, {
            id: DBUser.id,
            name: DBUser.name,
            mail: DBUser.mail
        }]
    }); 
    return {code: 200, data: userDTO}
}