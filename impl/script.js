var _ = require( "underscore" );
var createEnv = require( "./FabriqueEnv.js").create;

var rootDir = process.cwd();
console.log( "-- exec fabrique in dir: " + rootDir );

var env = createEnv( rootDir );

var argv = process.argv;

if( argv && argv.length == 3) {
    var script = rootDir + '/scripts/' + argv[2] + '.js';
    console.log("-- load script: " + script);

    var fab = env;
    var template = function( name, to ) {
        return fab.template( name, to);
    };

    var input = function( pattern ) {
        return fab.input( pattern );
    };

    var exec = require(script).exec;
    //exec(env);

    exec(input, template);
} else {
    console.error( "-- supports only one script-name!");
}

