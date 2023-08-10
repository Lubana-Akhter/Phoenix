const winston = require('winston');

// Create a new Winston logger instance
const logger = winston.createLogger({
  level: 'error', // Set the log level to 'error' to log only error messages
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Log errors to the console
    new winston.transports.Console({
      level: 'error', // Log only error messages to the console
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    // Optionally, log errors to a file
    new winston.transports.File({ filename: 'error.log', level: 'error' })
  ]
});

module.exports = logger;
