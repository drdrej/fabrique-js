var assert = require("assert");
var _ = require("underscore");
var S= require("string");

var createEnv = require( "../impl/FabriqueEnv.js").create;

describe('FabriqueEnv', function () {

    it( "*.create(root)", function (done) {
        createEnv(__dirname);

        // assert.equal("c:/root/test", result);

        done();
    });
});