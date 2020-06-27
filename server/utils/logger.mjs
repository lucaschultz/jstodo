import fs from 'fs';

const defaultPath = './server.log';

function logStream (path) {
    return fs.createWriteStream(path, { 'flags': 'a', 'encoding': 'utf8'});
}

class Logger {

    constructor (path = defaultPath) {
        this.stream =  logStream(path);
    }

    log (message, timeStamp = true) {
        this.stream.write(`${timeStamp ? new Date().toString() : ''}: ${message}\n`);
        console.log(message);
    }

}

export default Logger;