import winston from 'winston';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const isDevelopment = process.env.NODE_ENV === 'development';

const level = () => {
  return isDevelopment ? 'debug' : 'warn';
};

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  // In development, use a simple, colorized format.
  isDevelopment
    ? winston.format.colorize({ all: true })
    : winston.format.uncolorize(),
  winston.format.splat(),
  // In production, use JSON format. In development, use a simple string format.
  isDevelopment
    ? winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
      )
    : winston.format.json()
);

const transports = [new winston.transports.Console()];

export const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});
