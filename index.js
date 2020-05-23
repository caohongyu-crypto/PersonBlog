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
app.get('/queryBlogByPage', loader.get('/queryBlogByPage'))

//博客总数接口
app.get('/queryBlogCount', loader.get('/queryBlogCount'))

//获取博客详情
app.get('/queryBlogById', loader.get('/queryBlogById'))

//新增评论
app.get('/addComment', loader.get('/addComment'))

//获取验证码
app.get('/queryRandomCode', loader.get('/queryRandomCode'))

//获取博客留言
app.get('/queryCommentByBlogId', loader.get('/queryCommentByBlogId'))

//获取博客所有留言
app.get('/queryCommentsCountByBolgId', loader.get('/queryCommentsCountByBolgId'))

app.listen(globalConfig.port, () => {
    console.log('服务已经启动');
})