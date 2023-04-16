import { pino } from 'pino';

const file = `logs/${process.pid}.log`

const logger = (process.env.NODE_ENV == "production") ? pino(pino.transport({
    targets: [{
        level: 'warn',
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