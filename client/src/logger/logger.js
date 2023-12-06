import pino from 'pino';
import { redact } from 'pino';

const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    prettyPrint: {
        levelFirst: true,
        translateTime: 'SYS:standard',
    },
    redact: {
        paths: ['password', 'accessToken', 'refreshToken'],
        censor: '***REDACTED***',
    },
});

export default logger;
