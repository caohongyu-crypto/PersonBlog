var everyDayDao = require('../dao/EveryDayDao');
var timeUtil = require('../util/timeUtil');
var respUtil = require('../util/respUtil');
var path = new Map();

function editEveryDay(request, response){
    request.on('data', data => {
        everyDayDao.insertEveryDay(data.toString().trim(), timeUtil.getNow(), result => {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '添加成功', null));
            response.end();
        })
    })
}

path.set("/editEveryDay", editEveryDay);

function queryEveryDay(request, response){
    everyDayDao.queryEveryDay(result => {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '添加成功', result));
        response.end();
    })
}

path.set("/queryEveryDay", queryEveryDay);

module.exports.path = path;