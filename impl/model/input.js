var _ = require('underscore');
var W = require('wrench');

// var match = require("./match-path.js").match;
// var S = require("string");

var Source = function(fabrique) {
   this.fabrique = fabrique;
};

Source.prototype.input = function( pattern, pipe ) {
    var path = this.fabrique.root + '/model';

    console.log( "-- use path to find an input: " + path );

    W.readdirRecursive( path, function(error, files) {
        _.each(files, function(file) {
            pipe(file);
        });
    });

    // 1. resolve path
    // -> benötigt: fabrique

    // 2. lado document
    // ->pipe Document

};


exports.source = Source;