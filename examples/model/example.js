require fabrique env
var env = createEnv( rootDir );

fabrique.document( "*.schema.json" ).select( "> X > Y" ).use( ["X", ">*>"], function(X, A){
    var modelX{
        name: X,
            value: A
    };

    send( "app/db/schema", modelX );
}).dump( "temp_{{A}}.json" );

on( "app/db/schema" ).select( "> X > Y" ).use( function(modelX){

});