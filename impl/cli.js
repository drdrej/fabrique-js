var _ = require( "underscore" );
var createEnv = require( "./FabriqueEnv.js").create;

var startShell = function() {
    var readline = require('readline');

    var input = readline.createInterface(process.stdin, process.stdout);

    //while(true) {
    input.setPrompt('fabrique> ');
    input.prompt();

    input.on( 'line', function(line) {
        var command = parseLine(line);
        input.setPrompt('fabrique> ');
        input.prompt();

        return;
    }).on('close',function(){
            // that.closeFabrique();
            process.exit(0);
        });
    // }
};


var rootDir = process.cwd();
console.log( "-- exec fabrique in dir: " + rootDir );

var env = createEnv( rootDir );



startShell();



var parseLine = function(line) {
    var trimmed = "";

    if( !line
        || !_.isString(line)
        || ((trimmed = line.trim()).length < 1) ) {
        console.log( pad("nothing to execute. borring.") );

        return;
    }

    var splitted = trimmed.split(" ");

    if( !splitted || !_.isArray(splitted) ) {
        console.log( pad("couldn't parse cli. retry!") );

        return;
    }

    // init command to start execution :::
    var cmd = {
        name : splitted[0]
    };

    console.log(pad("try to exec command: " + cmd.name ));
};

var pad = function( msg ) {
    var S = require('string');
    return S(msg).padLeft((msg.length + 5)).toString();
};




