var moment = require('moment');
function getNow(){
    const now = Date.now();
    const time = moment(parseInt(now)).format("YYYY-MM-DD");
    return time;

    // return parseInt(Date.now() / 1000);
}

module.exports.getNow = getNow;