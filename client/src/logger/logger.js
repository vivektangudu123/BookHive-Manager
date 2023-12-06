import winston from "winston";
import { format } from "winston";
const { combine, timestamp, json, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] [${level}] ${message}`;
});

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
        format.colorize(),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        myFormat
    ),
    transports: [
        new winston.transports.Console({
            format: combine(
                format.errors({ stack: true }),
                format.simple()
            ),
        }),
        new winston.transports.File({
            filename: '../logs/server.log',
            maxsize: 5242880,
            maxFiles: 5,
            tailable: true,
            format: combine(
                format.errors({ stack: true }),
                format.json()
            ),
        }),
    ],
});

export default logger;
