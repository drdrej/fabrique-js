var _ = require('underscore');
var W = require('wrench');

var Source = function(fabrique, pattern) {
   this.fabrique = fabrique;
   this.queue = [];
   this.pattern = pattern;
};

Source.prototype.input = function( pipe ) {
    if( !(pipe && _.isFunction(pipe)) ) {
        console.error( "-- couldn't handle input. needs a callback." );
        throw new Error();
    }


    var path = this.fabrique.root + '/model';
    console.log( "-- use path to find an input: " + path );

    // Path.exists()?

    W.readdirRecursive( path, function(error, files) {
        _.each(files, function(file) {

                // TODO: fix. match pattern
                pipe({
                    path: path,
                    file: file
                });
        });
    });
};

exports.create = function( fabrique, pattern ) {
    return new Source( fabrique, pattern );
};