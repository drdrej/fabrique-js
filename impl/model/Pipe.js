var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;

var Pipe = function(source) {
    this.source = source;
    this.emitter = new EventEmitter();
    this.transformations = 0;

    this.emitter.on( 't1', function() {
        console.log( "*********** TTTT 1 ********* is called! ");
    })
};

Pipe.prototype.transform = function( query, transformation, from) {
    if( !(transformation && _.isFunction(transformation)) ) {
        console.warn( "-- skip transformation for query: '" + query + "'. passed param:transformation is not a function.");
        return;
    }

    // use EventEmitter:
    var pipe = this.emitter;

    // choose incomming:
    var incoming = from ? from : 'source';

    // create new route:
    var outgoing = "transform-" + this.transformations;
    this.transformations++;
    console.log( "-- create event-route: " + incoming + " -> " + outgoing );

    // add handler.
    this.emitter.on( incoming, function(source) {
        var result = transformation(source);
        pipe.emit( outgoing, result );
    });

    var that = this;
    return {
        outgoing : outgoing,

        transform : function(query, transformation) {
            that.transform( query, transformation, this.outgoing);
        },

        apply: function( success ) {
            that.apply( success );
        }
    };
};

Pipe.prototype.handle = function(transformation, from) {
    if( !(transformation && _.isFunction(transformation)) ) {
        console.warn( "-- skip transformation for query: '" + query + "'. passed param:transformation is not a function.");
        return;
    }

    // use EventEmitter:
    var pipe = this.emitter;

    // choose incomming:
    var incoming = from ? from : 'source';

    // create new route:
    var outgoing = "transform-" + this.transformations;
    this.transformations++;
    console.log( "-- create event-route: " + incoming + " -> " + outgoing );

    // add handler.
    this.emitter.on( incoming, function(source) {
        var result = transformation(source);
        pipe.emit( outgoing, result );
    });

    var that = this;
    return {
        outgoing : outgoing,

        handle : function(transformation) {
            that.handle( transformation, this.outgoing);
        },

        apply: function( success ) {
            that.apply( success );
        }
    };
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