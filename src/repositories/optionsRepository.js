import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const getByName = async (optionName) =>{
    return await prisma.options.findFirst({
        where: {
            option_name: optionName
        }
    }) 
}

const getById = async (optionId) =>{
    return await prisma.options.findFirst({
        where: {
            id: optionId
        }
    })
}

const updateOptionById = async (id, newValue, changer) =>{
    return await prisma.options.update({
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
    getByName,
    getById,
    updateOptionById,
} 