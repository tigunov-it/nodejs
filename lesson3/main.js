'use strict'
const fs = require('fs');
const readline = require('readline');

const ACCESS_LOG = './access_tmp.log'
const ip1 = '89.123.1.41';
const ip2 = '176.212.24.22';

const readStream = fs.createReadStream(ACCESS_LOG, 'utf-8');

const writeStream1 = fs.createWriteStream(`${ip1}_requests.log`);
const writeStream2 = fs.createWriteStream(`${ip2}_requests.log`);

const rl = readline.createInterface({
    input: readStream,
    terminal: true
});

rl.on('line', (line) => {
    if (line.includes(ip1)) {
        writeStream1.write(line + '\n');
    }
    if (line.includes(ip2)) {
        writeStream2.write(line + '\n');
    }
})
