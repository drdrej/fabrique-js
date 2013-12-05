var exists = require( '../config/Path.js' ).exists;

var Dump = function( path ) {
   this.path = path;
};

Dump.prototype.append = function( path, element ) {
    // TODO: model dynamisch ändern/anpassen
};


Dump.prototype.create = function( model ) {
    if(exists( this.path)) {
        console.error( "-- couldn't create, resource allready exists: " + path );
        return;
    }

    var json = require( "jsonfile" );
    json.writeFileSync( this.path, model );
};

exports.create = function( path ) {
  return new Dump( path );
};