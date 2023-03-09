import { mailer } from "../../gateways/mailer_gateway.js";
import mailRepository from "../../repositories/mailRepository.js";
import { mailLogger } from "../../utils/logger.js";
import { MAIL_USER, MAIL_TARGET } from "../../utils/envConfigLoader.js";

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
        let res = await mailer.sendMail(mailToSend);        
        if (res) { 
            await mailRepository.add(mailToSend, {info: res.messageId, error: null}) 
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