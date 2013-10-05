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
                        classes : ""
                    }
                });

                assert.ok(_.isObject(fabrique) );



//                assert.ok( _.isObject(account)  );
//                assert.equal( account._id, login );
//                assert.ok(_.isArray(account.family) );

                console.log( "call test-find account:::" );
                done();
            });
    });
});