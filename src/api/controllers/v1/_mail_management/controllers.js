import { sendMail } from '../../../../_mail_management/usecases/index.js'

const mailSender = async (req, res) =>{    
    let response = await sendMail(req.body)
    res.status(response.code).send(response.msg)
}

export default {
    mailSender
} 