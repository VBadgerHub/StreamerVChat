import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const add = async (optionData) =>{
    return await prisma.options.create({
        data: {
            option_name : optionData.name,
            option_description : optionData.desc,
            option_value : optionData.value,
            change_date : null,
            change_by : null
        }
    }) 
}

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
    add,
    getByName,
    getById,
    updateOptionById,
} 