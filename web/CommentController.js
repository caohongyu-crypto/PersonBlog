var blogDao = require('../dao/BlogDao');
var tagsDao = require('../dao/TagsDao');
var commentDao = require('../dao/CommentDao');
var tagBlogMappingDao = require('../dao/TagBlogMappingDao');
var timeUtil = require('../util/timeUtil');
var respUtil = require('../util/respUtil');
var captcha = require('svg-captcha');
var url = require('url');

var path = new Map();

function addComment (request, response){
    var params = url.parse(request.url, true).query;
    commentDao.insertComment(parseInt(params.bid), parseInt(params.parent), params.parentName, params.userName, params.email, params.content, timeUtil.getNow(), timeUtil.getNow(), result => {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '评论成功', null));
        response.end();
    })
}

path.set('/addComment', addComment);

function queryRandomCode(request, response){
    var img = captcha.create({fontSize:50, width:100, height:34});

    response.writeHead(200);
    response.write(respUtil.writeResult('success', '获取成功', img));
    response.end();
}

path.set('/queryRandomCode', queryRandomCode);

function queryCommentByBlogId(request, response){
    var params = url.parse(request.url, true).query;
    commentDao.queryCommentByBlogId(parseInt(params.bid), result => {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '评论成功', result));
        response.end();
    });
}

path.set('/queryCommentByBlogId', queryCommentByBlogId);

function queryCommentsCountByBolgId(request, response){
    var params = url.parse(request.url, true).query;
    commentDao.queryCommentsCountByBolgId(parseInt(params.bid), result => {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '评论成功', result));
        response.end();
    });
}

path.set('/queryCommentsCountByBolgId', queryCommentsCountByBolgId);

module.exports.path = path;
