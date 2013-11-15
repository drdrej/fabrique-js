var _ = require("underscore");
var pathUtil = require("path");
var fs = require('fs');
var out = require("../out/out.js" );
var select = require('JSONSelect');

// var fullPath = pathUtil.resolve( this.root, "./fabrique.json" );

exports.resolveAll = function (config) {
    config.output = resolve( config.root, "config.output", config.output, 1001);

    var toolset = new ToolSet(config);

    // Handle toolset :::
    var selected = select.match( ".toolset > *", config );
    _.each(selected, function( def ) {
         toolset.load(def);
    });
};

// TODO: HIER WEITER MACHEN!!! TOOLSET aufloesen und ausführen.
var resolve = function(root, pathName, value, errCode) {
    console.log("parse " + pathName + " = " + value );

    var trimmed = "";
    if (!(value && _.isString(value)
        && (trimmed = value.trim()).length > 0)) {
        out.err( "Couldn't exec fabrique.", "couldn't resolve output-path.:" + value, errCode );
        return;
    }

    var resolved = pathUtil.resolve( root, trimmed );
    if( !(resolved && _.isString(resolved) && fs.existsSync(resolved) ) ) {
        out.err( "Couldn't exec fabrique.", "fabrique-path of type " + pathName + " doesn't exists. path = " + resolved, errCode );
        return;
    }

    return resolved;
};


var ToolSet = function(config) {
   this.config = config;
};

ToolSet.prototype.load = function(def) {
    def.absolutePath =  resolve( this.config.root, "config.toolset[ " + def.id + " ].path", def.path, 1002);

    console.log("resolved toolset-path: " + def.absolutePath );

    return this;
};