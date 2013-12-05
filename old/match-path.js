var _ = require( 'underscore' );
var wrench = require( 'wrench' );
var S = require('string');

exports.match = function(root, pattern, push ) {
    wrench.readdirRecursive(root, function(error, files) {
        console.log("-- match " + Log.nrOf(files) + " files.");

        if(error) {
            Log.hasMatchError(error);
            return;
        }

        _.each( files, function(file) {
            console.log( "-- check path: " + file);
            if( isPattern(file, pattern) ) {
                console.log( "-- matched path: " + file);

                var path = root + "/" + file;
                push(path);
            }
        });
    });
};

var isPattern = function(file, pattern) {
    var s = S(file.trim());
    var p = S(pattern);

    if(p.startsWith("*")) {
        var end = p.right(p.length-1) + "";
        console.log( "## match: " + end + " in path: " + file);
        return s.endsWith(end);
    } else {
        return s.endsWith(pattern);
    }
};


var Log = {
    nrOf : function( arr ) {
        if(_.isArray(arr))
           return arr.length;

        return 0;
    },

    hasMatchError : function(error) {
        console.log( "## error ## : couldn't match files recursive." );
        console.error(error);
    }
};