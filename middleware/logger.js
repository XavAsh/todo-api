const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'logs.txt');

const logger = (req, res, next) => {
    const logMessage = `[${new Date().toISOString()}] Method: ${req.method}, URL: ${req.url}\n`;
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });
    next();
}

module.exports = logger;
