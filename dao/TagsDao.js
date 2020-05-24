var dbutil = require('./DButil');
//tag的controller在blogController中 ***
function insertTag(tag, ctime, utime, success){
    var insertSql = "insert into tags (`tag`, `ctime`, `utime`) values(?, ?, ?)";
    var params = [tag, ctime, utime];

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

function queryTag(tag, success){
    var insertSql = "select * from tags where tag=?";
    var params = [tag];

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


module.exports.insertTag = insertTag;
module.exports.queryTag = queryTag;
