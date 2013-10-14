console.log("### run tests ### ");

var assert = require("assert");
var _ = require("underscore");
var match = require("../impl/promises/match-path.js").exec;

describe('Fabrique', function () {

    it( "match(path)", function (done) {
        var root = __dirname + "/data";
        console.log( "-- root : " + root);

        match( root, "*/*.json")
             .then( function( file ) {
             console.log("###--## file : " + file);
             done();
         }). then( null, function(error) {
             done(error);
         });
    });
});