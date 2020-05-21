var fs = require('fs');

var globalConfig = {};

var conf = fs.readFileSync('./server.conf');

var configArr = conf.toString().split('\n');

for(var i = 0; i < configArr.length; i++){
    var keyArr = configArr[i].split('=');
    globalConfig[keyArr[0].trim()] = keyArr[1].trim();
}

module.exports = globalConfig;