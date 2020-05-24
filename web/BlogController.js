var blogDao = require('../dao/BlogDao');
var tagsDao = require('../dao/TagsDao');
var tagBlogMappingDao = require('../dao/TagBlogMappingDao');
var timeUtil = require('../util/timeUtil');
var respUtil = require('../util/respUtil');
var url = require('url');
var path = new Map();

//查询所有博客
function queryAllBlog(request, response){
    blogDao.queryAllBlog(result => {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    })
}

path.set('/queryAllBlog', queryAllBlog);

//查询热门博客
function queryHotBlog(request, response){
    blogDao.queryHotBlog(5, result => {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    })
}

path.set('/queryHotBlog', queryHotBlog);

function queryBlogById(request, response){
    var params = url.parse(request.url, true).query;
    blogDao.queryBlogById(parseInt(params.bid), result => {
        //成功之后返回的提示信息
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
        //每次请求接口，浏览次数增加1
        blogDao.addViews(params.bid, result => {})
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

//获取所有标签
function queryRandomTags(request, response){
    blogDao.queryRandomTags(result => {
        result.sort(function (){
            return Math.random() - 0.5;
        })
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '添加成功', result));
        response.end();
    })
}

path.set('/queryRandomTags', queryRandomTags);

//根据标签查找博客
function queryByTag(request, response){
    var params = url.parse(request.url, true).query;
    tagsDao.queryTag(params.tag, result => {
        if(result == null || result.length == 0){
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '添加成功', result));
            response.end();
        }else{
            tagBlogMappingDao.queryByTag(result[0].id, parseInt(params.page), parseInt(params.pageSize), result => {
                var blogList = [];
                for(let i = 0; i < result.length; i++){
                    blogDao.queryBlogById(result[i].blog_id, result => {
                        blogList.push(result[0]);
                    })
                }
                getResult(blogList, result.length, response);
                
            });
        }
    });
}

path.set('/queryByTag', queryByTag);

//判断是否传完
function getResult(blogList, len, response){
    if(blogList < len){
        setTimeout(() => {
            getResult(blogList, len, response)
        }, 10);
    }else{//传完就返回
        for(var i = 0; i < blogList.length; i++){
            blogList[i].content = blogList[i].content.replace(/(\!\[\])(\([\w\W]*[\)])/g, '');//将图片格式换成''
            // blogList[i].content = blogList[i].content.replace(/(<[\w\W]*>)(<\/[\w\W]*>)/g, '');
            blogList[i].content = blogList[i].content.substring(152, 300);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '添加成功', blogList));
        response.end();
    }
}

//查找当前标签下所有博客
function queryByTagCount(request, response){
    var params = url.parse(request.url, true).query;
    tagsDao.queryTag(params.tag, result => {
        tagBlogMappingDao.queryByTagCount(result[0].id, result => {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '添加成功', result));
            response.end();
        })
    });
}

path.set('/queryByTagCount', queryByTagCount);

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