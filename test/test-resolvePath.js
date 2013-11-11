var assert = require("assert");
var _ = require("underscore");
var S= require("string");

var resolvePath = require( "../impl/init/resolvePath.js").resolve;

describe('Fabrique', function () {

    it( "resolvePath(path)", function (done) {
        var root = __dirname + "/data";
        console.log( "-- root : " + root);

        var result = resolvePath( "/test", "c:/root" );
        assert.equal("/test", result);

        var result = resolvePath( "./test", "c:/root" );
        assert.equal("c:/root/test", result);

        var result = resolvePath( "./test", "c:/root" );
        assert.equal("c:/root/test", result);

        done();
    });
});