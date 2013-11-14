var _ = require( "underscore" );
var createEnv = require( "./FabriqueEnv.js").create;

var startShell = function() {
    var readline = require('readline');

    var input = readline.createInterface(process.stdin, process.stdout);
    input.setPrompt('fabrique> ');
    input.prompt();

    input.on( 'line', function(line) {
        if (line === "exit")
            input.close();

        input.prompt();
    }).on('close',function(){
            // that.closeFabrique();
            process.exit(0);
        });
};


var rootDir = process.cwd();
console.log( "-- exec fabrique in dir: " + rootDir );

var env = createEnv( rootDir );



startShell();




