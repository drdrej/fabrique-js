var _ = require("underscore");
var pathUtil = require("path");
var fs = require('fs');
var out = require("../out/out.js" );
var select = require('JSONSelect');


// ###############################################
// ##                    Impl
// ###############################################
var resolveAll  = function (config) {
    config.output = resolve( config.root, "config.output", config.output, 1001);

    var toolset = new ToolSet(config);

    // Handle toolset :::
    var selected = select.match( ".toolset > *", config );
    _.each(selected, function( def ) {
        toolset.load(def);
    });
};

var exists = function( path ) {
    var has = (path && _.isString(path) && fs.existsSync(path) )
    if( !has ) {
        console.log( "resource doesn't exists: " + path);
        return false;
    }

    return true;
};

var resolve = function(root, pathName, value, errCode) {
    console.log("parse " + pathName + " = " + value );

    var trimmed = "";
    if (!(value && _.isString(value)
        && (trimmed = value.trim()).length > 0)) {
        out.err( "Couldn't exec fabrique.", "couldn't resolve output-path.:" + value, errCode );
        return;
    }

    var resolved = pathUtil.resolve( root, trimmed );
    exists(resolved);

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




// ###############################################
// ##                    API
// ###############################################

exports.resolveAll = resolveAll;

exports.resolve = resolve;

exports.exists = exists;
