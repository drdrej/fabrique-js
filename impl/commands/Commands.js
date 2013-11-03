
var Commands = function() {

};

Commands.prototype.model = function( path ) {

};


exports.create = function() {
    var EventEmitter = require('events').EventEmitter;
    var util = require('util');

    util.inherits(Commands, EventEmitter);
};