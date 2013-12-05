var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;

var Pipe = function(source) {
    this.source = source;
    this.emitter = new EventEmitter();
};



Pipe.prototype.transform = function( pattern ) {
    this.emitter.on( 'source', function(source) {
        console.log("-- CALL TRANSFORMATION!!!");
        console.log(source);
    });

    return this;
};

Pipe.prototype.apply = function( handler ) {
    var source = this.source;
    var that = this;

    source.input(function( event ) {
        var loadModel = require( './loadModel.js' ).load;
        var fullPath = event.path + "/" + event.file;
        var file =  loadModel( fullPath );

        if( file ) {
            console.log("-- emmit event:" );
            that.emitter.emit('source', file);
        } else {
            console.warn( "-- skip resource: " + fullPath);
            return;
        }
    });
};

exports.create = function(source) {
   return new Pipe(source);
};