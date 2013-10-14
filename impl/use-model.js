var RSVP = require( "rsvp" );
var when = function( promised ) {
    return new RSVP.Promise( promised );
};

var _ = require( "underscore" );
// var glob = require("glob");

// "**/*.json"

exports.useModel = function( pattern ) {
    try {
        return when( function(resolve, reject) {
            console.log( "-- couldn't resolve path: " + pattern );
   /*         glob(pattern, function (err, files) {
                _.each(files, function(file){
                    console.log( "[MODEL]  found file: " + file);
                    return resolve( file );
                });
            });    */

            return resolve( "problem" );
        });
    } catch( err ) {
        console.log( "!!! create error !!!" );
        // return reject( err );
        throw new Error( "ROCKNROLL" );
    }
};