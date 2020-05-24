var dbutil = require('./DButil');

function insertBlog(title, content, tags, views, ctime, utime, success){
    var insertSql = "insert into blog (`title`, `content`, `tags`, `views`, `ctime`, `utime`) values(?, ?, ?, ?, ?, ?)";
    var params = [title, content, tags, views, ctime, utime];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, (error, result) => {
        if(error == null){
            success(result);
        }else{
            throw new Error(error);
        }
    })
    connection.end();

}

//查找博客
function queryBlogByPage(page, pageSize, success){
    var insertSql = "select * from blog order by id desc limit ?, ?";
    var params = [page * pageSize, pageSize];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, (error, result) => {
        if(error == null){
            success(result);
        }else{
            throw new Error(error);
        }
    })
    connection.end();

}

//查找所有博客
function queryAllBlog(success){
    var querySql = "select * from blog";
    var params = [];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, (error, result) => {
        if(error == null){
            success(result);
        }else{
            throw new Error(error);
        }
    })
    connection.end();

}

//根据id查找博客
function queryBlogById(id, success){
    var querySql = "select * from blog where id = ?";
    var params = [id];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, (error, result) => {
        if(error == null){
            success(result);
        }else{
            throw new Error(error);
        }
    })
    connection.end();

}

//改变每篇博客的访问量
function addViews(id, success){
    var querySql = "update blog set views = views + 1 where id = ?;";
    var params = [id];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, (error, result) => {
        if(error == null){
            success(result);
        }else{
            throw new Error(error);
        }
    })
    connection.end();

}

//查询最近热门博客
function queryHotBlog(size, success){
    var querySql = "select * from blog order by views desc limit ?;";
    var params = [size];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, (error, result) => {
        if(error == null){
            success(result);
        }else{
            throw new Error(error);
        }
    })
    connection.end();

}




//查找博客总数
function queryBlogCount(success){
    var querySql = "select count(1) as count from blog";
    var params = [];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, (error, result) => {
        if(error == null){
            success(result);
        }else{
            throw new Error(error);
        }
    })
    connection.end();

}

//查找所有标签
function queryRandomTags(success){
    var querySql = "select * from tags";
    var params = [];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, (error, result) => {
        if(error == null){
            success(result);
        }else{
            throw new Error(error);
        }
    })
    connection.end();

}

module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogById = queryBlogById;
module.exports.queryAllBlog = queryAllBlog;
module.exports.queryRandomTags = queryRandomTags
module.exports.addViews = addViews
module.exports.queryHotBlog = queryHotBlog


