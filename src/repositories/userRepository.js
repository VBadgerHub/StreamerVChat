import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()


const add = async (user) =>{
    return await prisma.users.create({
        data: {
            ...user,
            date_of_birth: new Date(user.date_of_birth),
            create_date: new Date()
            // is_active     
            // is_mail_auth  
            // is_locked     
        }
    })
}

const getByName = async (optionName) =>{
    return await prisma.users.findFirst({
        where: {
            option_name: optionName
        }
    })
}

const getById = async (optionId) =>{
    return await prisma.users.findFirst({
        where: {
            id: optionId
        }
    })
}

const deleteAll = async () =>{
    await prisma.users.deleteMany();

}

const updateOptionById = async (id, newValue, changer) =>{
    return await prisma.users.update({
        where: {
            id: id
        },
        data : {
            change_date: new Date(),
            change_by: changer,
            option_value: newValue
        }
    })
}

export default 
{ 
    add,
    getByName,
    getById,
    updateOptionById,
    deleteAll,
} 