var _ = require( 'underscore' );
var Path = require('./config/Path.js');


var createWorkDir = function(root) {
    var work = root + "/ work";
    var W = require('wrench');

    W.mkdirSyncRecursive(work, 0777);

    return work;
};

var FabriqueEnv = function(root) {
    this.root = root;
    console.log("-- use root: " + root );

    this.config = this.initConfig();
    Path.resolveAll(this.config);

    this.work = createWorkDir(this.root);
    console.log("-- use work-path: " + this.work);

    // TODO: macht diese Prüfung Sinn?
    if( !this.config || _.isNull(this.config) ) {
        // throw new Error();
        process.exit(0);
    }

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

    /*
    if( !fs.stat().isFile(fullPath) ) {
        console.error( "<error> ");
        console.error( "[WHAT]: couldn't init fabrique. " );
        console.error( "[WHY]:  fabrique.json is not a file. path = " + fullPath );
        console.error( "</error> ");

        return;
    } */

    var config = require( fullPath );
    console.log("-- fabrique.json successfull loaded. path = " + fullPath );

    config.root = this.root;

    return config;
};


FabriqueEnv.prototype.input = function( pattern ) {
    var Source = require('./model/Source.js' );
    var source = Source.create( this, pattern );

    var Pipe = require( './model/Pipe.js' );
    return Pipe.create(source);
};


FabriqueEnv.prototype.dump = function( path ) {
    var fullPath = this.work + "/" + path;
    console.log("-- dump: " + fullPath);

    var Dump = require( './model/Dump.js');
    return Dump.create(fullPath);
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

