var assert = require("assert");
var _ = require( "underscore" );
var create = require( "../impl/FabriqueEnv.js").create;

describe('Fabrique', function () {
    it( "*.create(root)", function (done) {
          console.log( "-- init fabrique");
          var fabrique = create( __dirname + "/project1/" );


          fabrique.input( "*.schema.json").select( '.name').apply(function(selected) {

          });


          done();
    });
});
