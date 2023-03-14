import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()


const add = async (user) =>{
    return await prisma.users.create({
        data: {
            ...user,
            date_of_birth: new Date(user.date_of_birth),
            create_date: new Date()  
        }
    })
}

const getByName = async (name) =>{
    return await prisma.users.findFirst({
        where: {
            name: name
        }
    })
}

const getById = async (id) =>{
    return await prisma.users.findFirst({
        where: {
            id: id
        }
    })
}

const getAll = async () =>{
    return await prisma.users.findMany()
}

const deleteAll = async () =>{
    await prisma.users.deleteMany();

}

export default 
{ 
    add,
    getByName,
    getById,
    getAll,
    deleteAll,
} 