console.log("### run tests ### ");

var assert = require("assert");
var _ = require( "underscore" );
var createFabrique = require( "../impl/fabrique.js").create;

describe('Fabrique', function () {

    describe('Create', function () {
        it("should create an instance",
            function (done) {

                console.log( "## dir ::: " + __dirname );

                var fabrique = createFabrique( {
                    root  : "",

                    input : {
                        classes : __dirname + "/input/classes"
                    },

                    output : {
                        classes : __dirname + "/output/classes"
                    }
                });

                assert.ok(_.isObject(fabrique) );

                var input = fabrique.input( "classes");

                assert.ok( _.isObject(input) );
                assert.ok(_.has(input, "model" ) );
                assert.equal( input.path, (__dirname + "/input/classes"));

                var patternDef = input.model( "**/*.json" );

                patternDef.apply( function( file )  {
                    // apply wird auf dem model aufgerufen, dann bekommt man das ganze objekt
                    // zurück gegeben.
                    console.log( "-- found file: " + file );
                });

                done();
            });
    });
});