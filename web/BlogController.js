var blogDao = require('../dao/BlogDao');
var tagsDao = require('../dao/TagsDao');
var tagBlogMappingDao = require('../dao/TagBlogMappingDao');
var timeUtil = require('../util/timeUtil');
var respUtil = require('../util/respUtil');
var url = require('url');
var path = new Map();


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