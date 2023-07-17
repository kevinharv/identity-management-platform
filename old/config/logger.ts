import { pino } from 'pino';

const logLevel = process.env.LOG_LEVEL || 'warn';
const logPath = process.env.LOG_PATH || 'logs';
const file = `${logPath}/ldap-service-${process.pid}.log`

const logger = (process.env.NODE_ENV == "production") ? pino(pino.transport({
    targets: [{
        level: logLevel,
        target: 'pino/file',
        options: {
            destination: file,
            mkdir: true,
            append: true
        }
    },
    {
        level: 'info',
        target: 'pino-pretty',
        options: {
            colorize: true,
            destination: 1
        }
    }]
})) : pino(pino.transport({
    targets: [
        {
            level: 'debug',
            target: 'pino-pretty',
            options: {
                colorize: true,
                destination: 1
            }
        }]
})); 

export default logger;