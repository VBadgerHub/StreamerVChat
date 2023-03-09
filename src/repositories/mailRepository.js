import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const add = async (mail, deliveryInfo ) =>{
    console.log(mail);
    console.log(deliveryInfo);
    await prisma.mail.create({
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