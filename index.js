var express = require('express');

var app = express();
var path = require('path');
var filename = path.resolve(__dirname, './page');

app.use(express.static(filename));//静态文件路径

app.listen(5500, () => {
    console.log('服务已经启动');
})