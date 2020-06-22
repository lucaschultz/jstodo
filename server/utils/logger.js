const fs = require("fs");

const defaultLogStream = fs.createWriteStream(
    './server.log',{ 'flags': 'a', 'encoding': 'utf8'});

function logger (message, stream = defaultLogStream, timeStamp = true) {
    stream.write(`${timeStamp ? new Date().toString() : ''}: ${message}\n`);
    console.log(message);
}

module.exports = logger;