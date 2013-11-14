


var FabriqueEnv = function(root) {
    this.root = root;
    this.config = this.initConfig();
    //this.checkConfig();

    if( !this.config || _.isNull(this.config) ) {
        throw new Error();
    }

    this.startShell();
};

FabriqueEnv.prototype.startShell = function() {
    var readline = require('readline');

    var input = readline.createInterface(process.stdin, process.stdout);
    input.setPrompt('fabrique>');
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

FabriqueEnv.prototype.initConfig = function() {
    console.log( "## load ./fabrique.json config");

    var pathUtil = require( "path" );
    var fullPath = pathUtil.resolve( this.root, "./fabrique.json" );

    console.log("-- resolved path = " + fullPath );

    var fs = require('fs');
    if( !fs.existsSync(fullPath) ) {
        console.error( "<error> ");
        console.error( "[WHAT]: couldn't init fabrique. " );
        console.error( "[WHY]:  fabrique.json doesn't exists. path = " + fullPath );
        console.error( "</error> ");

        return;
    }

    if( !fs.stat().isFile(fullPath) ) {
        console.error( "<error> ");
        console.error( "[WHAT]: couldn't init fabrique. " );
        console.error( "[WHY]:  fabrique.json is not a file. path = " + fullPath );
        console.error( "</error> ");

        return;
    }

    var config = require( fullPath );
    console.log("-- fabrique.json successfull loaded. path = " + fullPath );

    return config;
};

exports.create = function(root) {
    exports.header();

    var env = new FabriqueEnv(root);
    return env;
};


exports.header = function() {
    var npmProject = require( "../package.json" );
    var name = npmProject.name;
    var version = npmProject.version;
    var desc = npmProject.description;

    console.log("#####################################################");
    console.log("## Project: " + name);
    console.log("## Version: " + version);
    console.log("## --------------------------------------------------" );
    console.log("## " + desc );
    console.log("## --------------------------------------------------");
    console.log("## (c) 2013 by Andreas Siebert (aka drdrej)");
    console.log("##             ask@touchableheroes.com     " );
    console.log("#####################################################");

};