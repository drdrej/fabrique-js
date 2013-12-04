console.log("### run tests ### ");

var assert = require("assert");
var _ = require("underscore");
var useModel = require("../impl/use-model.js").useModel;

describe('Fabrique', function () {

    it( "useModel - promise", function (done) {
         useModel( "*/*.json")
             .then( function( result ) {
             done();
         }). then( null, function(error) {
             done(error);
         });
    });
});