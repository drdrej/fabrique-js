var _ = require('underscore');
var W = require('wrench');

var Source = function(fabrique) {
   this.fabrique = fabrique;
   this.queue = [];
};

Source.prototype.input = function( pattern, pipe ) {
    if( !(pipe && _.isFunction(pipe)) ) {
        console.error( "-- couldn't handle input. needs a callback." );
        throw new Error();
    }


    var path = this.fabrique.root + '/model';
    console.log( "-- use path to find an input: " + path );

    W.readdirRecursive( path, function(error, files) {
        _.each(files, function(file) {
                // TODO: fix. match pattern
                pipe(file);
        });
    });
};



exports.create = function( fabrique ) {
    return new Source( fabrique );
};