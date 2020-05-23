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

//根绝id查找博客
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

module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogById = queryBlogById;

