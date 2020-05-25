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

//获取所有博客
app.get('/queryAllBlog', loader.get('/queryAllBlog'))

//获取所有标签
app.get('/queryRandomTags', loader.get('/queryRandomTags'))

//获取热门博客
app.get('/queryHotBlog', loader.get('/queryHotBlog'))

//获取最新评论
app.get('/queryNewComment', loader.get('/queryNewComment'))

//根据标签获取博客
app.get('/queryByTag', loader.get('/queryByTag'))

//根据标签获取博客数量
app.get('/queryByTagCount', loader.get('/queryByTagCount'))

//搜索博客
app.get('/queryBlogByValue', loader.get('/queryBlogByValue'))



app.listen(globalConfig.port, () => {
    console.log('服务已经启动');
})