// test  console/command für transform :::
var create = require( "../impl/FabriqueEnv.js").create;

console.log( "-- init fabrique");
var project = __dirname + "/test/project1/";
var fabrique = create( project );

fabrique.input( "*.schema.json" )
    .transform( '.name' )
    .apply(function(selected) {
        // ruft das erste apply auf.
        console.log( '>>>>>>>>>> READY' );
    });