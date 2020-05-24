var dbutil = require('./DButil');

function insertTagBlogMapping(tagId, blogId, ctime, utime, success){
    var insertSql = "insert into tag_blog_mapping (`tag_Id`, `blog_Id`, `ctime`, `utime`) values(?, ?, ?, ?)";
    var params = [tagId, blogId, ctime, utime];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, (error, result) => {
        if(error == null){
            success(result);
        }else{
            // throw new Error(error);
            console.log(error);
        }
    })
    connection.end();

}

//根据标签查找博客
function queryByTag(tagId, page, pageSize, success){
    var insertSql = "select * from tag_blog_mapping where tag_id = ? limit ?, ?;";
    var params = [tagId, page * pageSize, pageSize];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, (error, result) => {
        if(error == null){
            success(result);
        }else{
            // throw new Error(error);
            console.log(error);
        }
    })
    connection.end();

}

//根据标签查找所有博客
function queryByTagCount(tagId, success){
    var insertSql = "select count(1) as count from tag_blog_mapping where tag_id = ?;";
    var params = [tagId];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, (error, result) => {
        if(error == null){
            success(result);
        }else{
            // throw new Error(error);
            console.log(error);
        }
    })
    connection.end();

}


module.exports.insertTagBlogMapping = insertTagBlogMapping;
module.exports.queryByTag = queryByTag;
module.exports.queryByTagCount = queryByTagCount;
