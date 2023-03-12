import { mailer } from "../../gateways/mailer_gateway.js";
import mailRepository from "../../repositories/mailRepository.js";
import optionsRepository from "../../repositories/optionsRepository.js";
import { mailLogger } from "../../utils/logger.js";
import { MAIL_USER, MAIL_TARGET, MAIL_SENDER_ON } from "../../utils/envConfigLoader.js";

const mailCompose = (mailData) =>{
    const mail = {
        from: MAIL_USER? MAIL_USER : '',
        to: MAIL_TARGET? MAIL_TARGET : '',
        subject: mailData.subject,
        text: mailData.text,
    } 
    return mail
      
}

export const sendMail = async (mailOptions  ) =>{ 
    if (Object.keys(mailOptions).length < 1) {
        return {code: 400, msg: 'Empty or badly formatted object'}
    }
    
    let mailToSend = mailCompose(mailOptions) 
    
    mailLogger.info(`Mail Data: ${JSON.stringify(mailToSend)}}`)

    if (typeof mailToSend.subject !== 'string' || typeof mailToSend.text !== 'string') {
        mailLogger.error(`Mail Error: ${JSON.stringify(mailToSend)} MSG: Wrong object property value type`)
        return {code: 400, msg: 'Wrong object property value type'}
    }

    try {

        let res;
        let isMailerOn = await optionsRepository.getByName('IsMailerOn')

        if(isMailerOn.option_value == 1){
             res = await mailer.sendMail(mailToSend);      
        } else {
            res = {messageId: 'NOT SENT - MAILER IS OFF'}
            mailLogger.error(`Mail Error: ${JSON.stringify(mailToSend)} MSG: NOT SENT - MAILER IS OFF`)
            return {code: 500, msg: 'Mail not sent'}
        }

        if (res) { 
            let dbRes = await mailRepository.add(mailToSend, {info: res.messageId, error: null}).catch(error => {
                return true
            }) 
            if (dbRes) {
                mailLogger.error(`Mail Error: ${JSON.stringify(mailToSend)} MSG: DB conn error`)
                return {code: 500, msg: 'DB Error'}
            }
        }
        mailLogger.info(`Mail Send: ${JSON.stringify(mailToSend)} ID: ${res.messageId}`)
        return {code: 200, msg: 'Mail sent'}

    } catch (error) {    
        let message = 'Unknown Error'  
        if (error instanceof Error) message = error.message     
        mailLogger.error(`Mail Error: ${JSON.stringify(mailToSend)} MSG: ${message}`)
        await mailRepository.add(mailToSend, {info: null, error: message})
        return {code: 400, msg: message}
    }
}