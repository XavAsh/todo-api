const fs = require('fs');
const path = require('path');

const getLogFilePath = () => {
    const date = new Date().toISOString().split('T')[0]; // Get the date part of the ISO string
    return path.join(__dirname, `logs-${date}.txt`);
};

const logger = (req, res, next) => {
    const logMessage = `[${new Date().toISOString()}] Method: ${req.method}, URL: ${req.url}\n`;
    const logFilePath = getLogFilePath();
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });
    next();
}

module.exports = logger;
