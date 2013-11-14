var RSVP = require( "rsvp" );
var when = function( promised ) {
    return new RSVP.Promise( promised );
};

var _ = require( "underscore" );
// var glob = require("glob");

// "**/*.json"

var wrench = require( "wrench" );


exports.useModel = function( pattern ) {
    try {
        var rval = when( function(resolve, reject) {
            console.log( "-- couldn't resolve path: " + pattern );

            // var files = [];
            // wrench.readdirRecursive('my_directory_name', function(error, curFiles) {
                // curFiles is what you want
            // });

   /*         glob(pattern, function (err, files) {
                _.each(files, function(file){
                    console.log( "[MODEL]  found file: " + file);
                    return resolve( file );
                });
            });    */

            /* return resolve( {
                result : "problem"
            }); */

            return resolve( {
                path : "c:\\test",
                model : {}
            });
        });

        rval.then(function( value ) {
            console.log( "..." );
        }).then(null, function( error ) {
            console.error( error );
        });

        return rval;
    } catch( err ) {
        console.log( "!!! create error !!!" );
        // return reject( err );
        throw new Error( "ROCKNROLL" );
    }
};