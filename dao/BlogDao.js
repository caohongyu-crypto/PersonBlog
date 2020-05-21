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

module.exports.insertBlog = insertBlog;