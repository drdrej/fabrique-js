console.log("### run tests ### ");

var assert = require("assert");
var _ = require("underscore");
var match = require("../impl/commands/match-path.js").match;
var S= require("string");

describe('Fabrique', function () {

    it( "match(path)", function (done) {
        var root = __dirname + "/data";
        console.log( "-- root : " + root);

        var count = 0;
        match(root, "*.json", function ( path ){
            console.log( "-- found file to handle: " + path);

            count++;

            var r = S(path);
            assert.ok(r.endsWith( ".json" ) );

            console.log( "## matched files : " + count);

            if( count == 3 )
                done();
        });



    });
});