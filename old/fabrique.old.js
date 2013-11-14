
var RSVP = require( "rsvp" );
var when = function( promised ) {
    return new RSVP.Promise( promised );
};

var _ = require( "underscore" );

var check = require( "./config/config.js").check;

function Fabrique( config ) {
    this.config = config;



    this.model = function( name ) {
        console.log( "use model: " + name);
    };

    this.input = function( name ) {
        console.log( "-- choose {root-directory : " + name + "}" );

        var path = null;

        if( !_.has( this.config.input, name ) ) {
             console.log( "-- couldn't resolve path { name : " + name + "}. use this name as path." );
             path = "./" + name;
        } else {
            var candidate = this.config.input[name];

            if( !_.isString(candidate) ) {
                console.log( "-- path-candidate must be a string. check used fabrique-config." );
                path = "./" + name;
            } else {
                path = candidate;
            }
        }

        return require( "./fabrique-input.js").create( path );
    }
};

/**
 * Factory-Method to create a fabrique-instance
 *
 * @param config
 * @returns {Fabrique}
 */
exports.create = function( config ) {
  if( !check( config ) ) {
      throw "Coudldn't initialize fabrique. Check config!";
  }

  var rval = new Fabrique( config );

  return rval;
};