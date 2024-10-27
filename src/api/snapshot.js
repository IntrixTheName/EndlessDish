/*snapshot.js - Basic logging tool for JavaScript */

const fs = require('fs')
const path = require('path')

class Snapshot {
    constructor(filepath = "./log.log") {this.filepath = filepath}

    snap(msg) {
        const ts = new Date().toTimeString().split(' ')[0]
        fs.appendFile(this.filepath, `[${ts}] ${msg}\n`, (err) => {
            if(err) console.error("Failed to write log:", err);
        })
    }
}

module.exports = Snapshot