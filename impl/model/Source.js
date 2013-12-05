var _ = require('underscore');
var S = require('string');
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

    var that = this;
    W.readdirRecursive( path, function(error, files) {
        var source = that;

        _.each(files, function(file) {
            if( source.match(file) ) {
                console.log( "-- matched path: " + file);

                pipe({
                    path: path,
                    file: file
                });
            }
        });
    });
};


/**
 * match a file: '*filename.suffix'
 * these rule match everithing with prefix.
 *
 * @param file
 * @param pattern
 * @returns {*}
 */
Source.prototype.match = function(file) {
    var pattern = this.pattern;

    var s = S(file.trim());
    var p = S(pattern);

    if(p.startsWith("*")) {
        var end = p.right(p.length-1) + "";
        var isValid = s.endsWith(end);
        console.log( "-- match: " + end + " in path: " + file + " => " + isValid);
        return isValid;
    } else {
        var isValid = s.endsWith(pattern);
        console.log( "-- match: " + pattern + " in path: " + file + " => " + isValid);
        return isValid
    }
};

exports.create = function( fabrique, pattern ) {
    return new Source( fabrique, pattern );
};