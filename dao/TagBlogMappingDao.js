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

module.exports.insertTagBlogMapping = insertTagBlogMapping;