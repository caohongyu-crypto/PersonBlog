var blogDao = require('../dao/BlogDao');
var tagsDao = require('../dao/TagsDao');
var tagBlogMappingDao = require('../dao/TagBlogMappingDao');
var timeUtil = require('../util/timeUtil');
var respUtil = require('../util/respUtil');
var url = require('url');
var path = new Map();

function queryBlogById(request, response){
    var params = url.parse(request.url, true).query;
    blogDao.queryBlogById(parseInt(params.bid), result => {
        //成功之后返回的提示信息
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    })
}

path.set('/queryBlogById', queryBlogById);


function queryBlogByPage(request, response){
    var params = url.parse(request.url, true).query;
    blogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), result => {
        for(var i = 0; i < result.length; i++){
            result[i].content = result[i].content.replace(/(\!\[\])(\([\w\W]*[\)])/g, '');
            result[i].content = result[i].content.replace(/<[\w\W]*>/g, '');
            result[i].content = result[i].content.substring(0, 300);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    })
}

path.set('/queryBlogByPage', queryBlogByPage);

function editBlog(request, response){
    var params = url.parse(request.url, true).query;
    var tags = params.tags.replace(/ /g, '').replace('，', ',');
    request.on('data', data => {
        blogDao.insertBlog(params.title, data.toString(), tags, 0, timeUtil.getNow(), timeUtil.getNow(), result => {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '添加成功', null));
            response.end();
            var blogId = result.insertId;
            var tagList = tags.split(',');
            for(var i = 0; i < tagList.length; i++){
                if(tagList[i] == ''){
                    continue;
                }
                queryTag(tagList[i], blogId);
            }
        });
    })
}

path.set('/editBlog', editBlog);

//查询博客总数的函数
function queryBlogCount(request, response){
    blogDao.queryBlogCount(result => {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '添加成功', result));
        response.end();
    })
}

path.set('/queryBlogCount', queryBlogCount);

//查找标签
function queryTag(tag, blogId){
    tagsDao.queryTag(tag, result => {
        if(result == null || result.length === 0){//代表没有这个标签
            //插入这个新的标签
            insertTag(tag, blogId);
        }else{
            tagBlogMappingDao.insertTagBlogMapping(result[0].id, blogId, timeUtil.getNow(), timeUtil.getNow(), result => {});
        }
    })
}

//插入标签
function insertTag(tag, blogId){
    tagsDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), result => {
        insertTagBlogMapping(result.insertId, blogId);
    });
}

//插入标签和博客映射
function insertTagBlogMapping(tagId, blogId){
    tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), result => {});
}

module.exports.path = path;