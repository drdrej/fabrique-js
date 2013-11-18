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

    var cmd = {
        fabrique: env,
        name : splitted[0]
    };

    // parse command :::
    var args = splitted.slice(1);
    var parsedArgs = [];
    _.each(args, function( arg ) {
        var skipEmpty = arg.length < 1;
        if( skipEmpty )
            return;

        parsedArgs.push(arg);
    });

    var executable = loadCmd(cmd, parsedArgs);
    if(!executable)
        return;


    executable.exec();
};

var pad = function( msg ) {
    var S = require('string');
    return S(msg).padLeft((msg.length + 5)).toString();
};


var loadCmd = function( def, parsedArgs ) {
    var Cmd = require('./commands/Cmd.js');
    var cmd = Cmd.create(def);

    if( !cmd ) {
        console.log("couldn't execute command: " + def.name);
        return null;
    }

    cmd.cli(parsedArgs);

    console.log("###### parsed ::: " + cmd );
    console.log(cmd);

    cmd.loadConfig();

    return cmd;
};


