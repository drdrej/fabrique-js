var RSVP = require( "rsvp" );
var when = function( promised ) {
    return new RSVP.Promise( promised );
};

var _ = require( "underscore" );

var wrench = require( "wrench" );


exports.exec = function(root, pattern) {
    return when( function(resolve, reject){
        wrench.readdirRecursive(root, function(error, files) {
            if(error) {
                console.error( "!! couldn't walk recursiv over directories. something is wrong with wrench.");
                console.error(error);

                return reject(error);
            }

            handleResult(resolve, files);
        });
    });
};

var handleResult = function(resolve, files) {
    if(_.isString(files) ) {
       resolve(files);
    } else if(_.isArray(files)){
       console.log( "-- model-candidates: " + files.length );
       console.log( files );

        _.each( files, function(file) {
            console.log( "-- push candidate: " + file);
            resolve(file);
        });
    }
};