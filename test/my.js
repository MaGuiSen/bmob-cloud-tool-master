var tool = require("bmobcloud-local");
//请根据自己的情况修改application_id和rest_key信息
var options = require("../AppConfig.json");

tool.initialize(options.app_key, options.rest_key);

(function local() {
    var hello = require("../cloud/random.js").hello;
    tool.test(hello);
})();
