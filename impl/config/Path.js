var _ = require("underscore");
var pathUtil = require("path");
var fs = require('fs');
var out = require("../out/out.js" );
var select = require('JSONSelect');

// var fullPath = pathUtil.resolve( this.root, "./fabrique.json" );

exports.resolve = function (config) {
    /*
     {
     "output"  : "c:\temp",
     "toolset" : [
     {
     "id" : "fabrique:java-prj",
     "path" : "./toolset/java-prj"
     }
     ]
     }
     */

    console.log("parse config.output = " + config.output );

    var trimmed = "";
    if (!(config.output && _.isString(config.output)
        && (trimmed = config.output.trim()).length > 0)) {
        out.err( "Couldn't exec fabrique.", "couldn't resolve output-path.:" + config.output, 1001 );
        return;
    }

    var resolved = pathUtil.resolve( config.root, trimmed );
    if( !(resolved && _.isString(resolved) && fs.existsSync(resolved) ) ) {
        out.err( "Couldn't exec fabrique.", "fabrique.outout-path doesn't exists. path = " + resolved, 1001 );
        return;
    }

    // resolve toolsets:



};
