var S = require( 'string' );
var resolvePath = require('./resolvePath.js' );


var FabriqueEnv = function(root) {
    this.root = root;
};

FabriqueEnv.prototype.load = function( ){
    this.config = resolvePath(root, "fabrique.json" );

    // validate config:


    // prepare pathes:
    resolvePath(root, this.config.output);
    _.each( )

};

exports.load = function(root) {
     var fabrique = new FabriqueEnv(root);

    return fabrique;
};

exports.header = function(project, version) {
    console.log("#########################################");
    console.log("## Project: " + project);
    console.log("## Version: " + version);
    console.log("#########################################");
    console.log("-- Managed by fabrique v0.1" );
};