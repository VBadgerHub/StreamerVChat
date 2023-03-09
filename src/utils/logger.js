import { format, createLogger, transports } from "winston";

const clientFormat = format.printf(({level, message, timestamp}) =>{
    return `${timestamp} ${level} ${message}`
})

const transporter = (info_path, error_path) =>{
    return [
        new transports.File({
            level: 'error',
            filename: error_path
        }),
        
        new transports.File({
            level: 'info',
            filename: info_path
        }),
    ]
}

export const mailLogger = createLogger(
    {
        format: format.combine(
            format.timestamp({format: 'YYYY.MM.DD HH:mm:ss'}), 
            clientFormat
        ),
        transports: transporter('logs/mail_logs.log', 'logs/mail_errors.log') 
    }
)

export const swaggerLogger = createLogger(
    {
        format: format.combine(
            format.timestamp({format: 'YYYY.MM.DD HH:mm:ss'}), 
            clientFormat
        ),
        transports: transporter('logs/mail_logs.log', 'logs/mail_errors.log') 
    }
)