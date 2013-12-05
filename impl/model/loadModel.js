var S = require('string');
var exists = require('../config/Path.js').exists;

var isModel = function (path) {
    return S(path).endsWith('.json');
};

exports.load = function (path) {
    console.log("-- load model: " + path);

    if (!exists(path)) {
        console.error("-- couldn't load model: " + path);
        return;
    }

    if (!isModel(path)) {
        console.warn("-- is not a JSON-model: " + path);
        return;
    }

    return require(path);
};