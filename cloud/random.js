function onRequest(request, response, modules) {
    var ex_params = request.body.ex_params || {};
    // console.log(request.body.ex_params)
    // ex_params = JSON.parse(ex_params+''); //这个步骤在浏览器那边需要添加，可能是字符串被转移
    var size = request.body.size;
    if(!size || isNaN(size)){
        size = 1;
    }
    var db = modules.oData;
    db.find({
        "table":"FunImgModel",
        "where":ex_params,
        "limit":0,
        "count":1
    },function(err,data){
        var count = JSON.parse(data).count;
        if(count){
            getRandomOne(db,size,count,ex_params,response);
        }else{
            response.end('[]');
        }
    });
}

function getRandomOne(db,size,count,ex_params,response) {
    var num = GetRandomNum(0,count);
    db.find({
        "table":"FunImgModel",
        "limit":size,
        "where":ex_params,
        "skip":num,
    },function(err,data){
        var resultObject= JSON.parse(data);
        if(resultObject && resultObject.results && resultObject.results.length >= 1){
            response.end(JSON.stringify(resultObject.results));
        }else{
            getRandomOne(db,size,count,ex_params,response);
        }
    });
}

function GetRandomNum(Min,Max)
{
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}



var tool = require("bmobcloud-local");
//请根据自己的情况修改application_id和rest_key信息
var options = require("../AppConfig.json");
tool.initialize(options.app_key, options.rest_key);
(function local() {
    tool.test(onRequest,{size:'2',ex_params:{type:"动物"}});
})();