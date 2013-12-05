var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;

var Pipe = function(source) {
    this.source = source;
    this.emitter = new EventEmitter();

    this.emitter.on( 't1', function() {
        console.log( "*********** TTTT 1 ********* is called! ");
    })
};

Pipe.prototype.transform = function( query, transformation ) {
    if( !(transformation && _.isFunction(transformation)) ) {
        console.warn( "-- skip transformation for query: '" + query + "'. passed param:transformation is not a function.");
        return;
    }

    var pipe = this.emitter;
    this.emitter.on( 'source', function(source) {
        var result = transformation(source);
        pipe.emit( 't1', result );
    });

/*    this.emitter.on( 'source', function(source) {
        console.log("-- CALL TRANSFORMATION!!!");
        console.log(source);
    });
*/
    // return this;
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
            that.emitter.emit( 'source', file);
        } else {
            console.warn( "-- skip resource: " + fullPath);
            return;
        }
    });
};

exports.create = function(source) {
   return new Pipe(source);
};