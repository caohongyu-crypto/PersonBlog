var express = require('express');

var app = express();

app.use(express.static('./page/'));//静态文件路径

app.listen(12306, () => {
    console.log('服务已经启动');
})