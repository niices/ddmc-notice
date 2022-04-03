const fs = require('fs');
const dayjs = require('dayjs')

let options = {
    flags: 'a', // 
    encoding: 'utf8', // utf8编码
}

function initLogger (log){
    let minutes = Math.floor(dayjs().format('mm') / 10);
    let filePath = `./log/${dayjs().format('YYYY_MM_DD_HH')}_${minutes}.log`;
    let stderr = fs.createWriteStream(filePath, options);

    // 创建logger
    let logger = new console.Console(stderr);
    logger.log(log);

    stderr.close();
}

module.exports = initLogger;