var fs = require('fs');
var globalConfig = require('./config');

var controllerSet = [];
var pathMap = new Map();

var files = fs.readdirSync(globalConfig["web_path"]);//读取路径web下的所有文件

for(var i = 0; i < files.length; i++){
    var temp = require("./"+ globalConfig["web_path"] +"/" + files[i]);
    if(temp.path){
        for(var [key, value] of temp.path){
            if(pathMap.get[key] == null){//没有就添加一个
                pathMap.set(key, value);
            }else{//已经有了就不能再添加  报错
                throw new Error('url path异常, url:'+key);
            }
        }
        controllerSet.push(temp);
    }
}

module.exports = pathMap;