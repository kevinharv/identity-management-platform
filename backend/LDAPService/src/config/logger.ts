import { pino } from 'pino';

const file = `logs/${process.pid}.log`

const transport = pino.transport({
    targets: [{
        level: 'info',
        target: 'pino/file',
        options: {
            destination: file,
            mkdir: true,
            append: true
        }}, 
    {
        level: 'debug',
        target: 'pino-pretty',
        options: {
            colorize: true,
            destination: 1 
        }
    }]
});

// Initialize logger
const logger = pino(transport);

export default logger;