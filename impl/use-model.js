var RSVP = require( "rsvp" );
var when = function( promised ) {
    return new RSVP.Promise( promised );
};

var _ = require( "underscore" );
var glob = require("glob");

// "**/*.json"

exports.useModel = function( pattern ) {

    return when( function(resolve, reject) {
        glob(pattern, function (err, files) {
            _.each(files, function(file){
                console.log( "[MODEL]  found file: " + file);
                resolve( file );
            });
        });
    });


}