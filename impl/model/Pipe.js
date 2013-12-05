var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;

var Pipe = function(source) {
    this.source = source;
    this.emitter = new EventEmitter();
};



Pipe.prototype.transform = function( pattern ) {
    this.emitter.on( 'source', function(source) {
        console.log("-- CALL TRANSFORMATION!!!");
    });

    return this;
};

Pipe.prototype.apply = function( handler ) {
    var source = this.source;
    var that = this;
    source.input(function(element) {
        /*if( source.next && _.isFunction(source.next)) {
            // load function!
            source.next(element);
        }*/

        console.log("-- emmit event:" );
        that.emitter.emit('source', element);
    });
};

exports.create = function(source) {
   return new Pipe(source);
};