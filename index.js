var express = require('express');
var globalConfig = require('./config');
var loader = require('./loader');

var app = new express();

app.use(express.static('./page'));//静态文件路径

//每日一句接口
app.post('/editEveryDay', loader.get('/editEveryDay'))
app.get('/queryEveryDay', loader.get('/queryEveryDay'))

//博客接口
app.post('/editBlog', loader.get('/editBlog'))

app.listen(globalConfig.port, () => {
    console.log('服务已经启动');
})