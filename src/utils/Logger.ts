import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import chalk from 'chalk';

const logDir = 'logs';

const alignColorsAndTime = winston.format.combine(
  winston.format.colorize({
    all: true,
  }),
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:MM:SS',
  }),
  winston.format.printf(
    (info) =>
      `[${info.timestamp}] | [${chalk.yellow(info.label)}] | [${info.level}] | ${info.message}`
  )
);

const notalignColorsAndTime = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:MM:SS',
  }),
  winston.format.printf(
    (info) =>
      `[${info.timestamp}] | [${chalk.yellow(info.label)}] | [${info.level}] | ${info.message}`
  )
);

const logger = winston.createLogger({
  format: winston.format.combine(notalignColorsAndTime),
  transports: [
    new winstonDaily({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir,
      filename: `%DATE%.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/error',
      filename: `%DATE%.error.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), alignColorsAndTime),
    })
  );
}

const stream = {
  write: (message: string) => {
    logger.info({ label: 'morgan', message });
  },
};

class Logger {
  constructor(private label: string) {
    this.label = label;
  }

  public info(message: string): void {
    logger.info({ label: this.label, message });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public error(message: any): void {
    logger.error({ label: this.label, message });
  }
}

export { Logger, stream };
