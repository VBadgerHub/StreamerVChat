import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const add = async (mail, deliveryInfo ) =>{
    await prisma.mails.create({
        data: {
            ...mail,
            created_at: new Date(),
            info: deliveryInfo.info,
            error: deliveryInfo.error
        }
    })
}

export default 
{ 
    add,
} 