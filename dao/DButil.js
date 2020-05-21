//连接数据库

var mysql = require('mysql');

function createConnection(){
    var connection = mysql.createConnection({
        host:'127.0.0.1',
        port:'3306',
        user:'root',
        password:'123456',
        database:'myblog'
    });
    return connection;
}

module.exports.createConnection = createConnection;

// var {Sequelize} = require('sequelize');


// function createConnection(){
//     const connection = new Sequelize('myblog', 'root', 'caohongyu521..', {
//         host:'127.0.0.1',
//         dialect:'mysql',
//         port:3306,
//         logging:null
//     })
    
//     return connection;
// }

// module.exports.createConnection = createConnection;