import winston from "winston";

export const logger = winston.createLogger({
    format:winston.format.combine(
        winston.format.splat(),
        winston.format.timestamp({
            format:"YYYY-MM-DD HH:mm:ss"
        }),
        winston.format.colorize(),
        winston.format.printf(
            log => {
                if(log.stack){
                    return `[${log.timestamp}] [${log.level}] ${log.stack}`;
                }
                return `[${log.timestamp}] [${log.level}] ${log.stack}`;
            }
        )
    ),
    transports:[
        new winston.transports.Console(),
    ],
})