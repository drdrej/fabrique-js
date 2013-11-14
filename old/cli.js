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

    // parse command :::
    var args = splitted.slice(1);
    var parsedArgs = [];
    _.each(args, function( arg ) {
        var skipEmpty = arg.length < 1;
        if( skipEmpty )
            return;

        parsedArgs.push(arg);
    });

    _.each(parsedArgs, function(arg){
        console.log( "arg: " + arg );
    });

    var parsed = useNopt(parsedArgs);
    console.log(parsed);
};

var pad = function( msg ) {
    var S = require('string');
    return S(msg).padLeft((msg.length + 5)).toString();
};

var useNopt = function(args) {
    var nopt = require("nopt");
    var path = require("path");
    var knownOpts = {
       "resource" : String,
       "overwrite" : Boolean

    };
    var shortHands = {
       "r" : ["resource"],
       "o" : ["overwrite"]
    };

    return nopt(knownOpts, shortHands, args, 0);
};




