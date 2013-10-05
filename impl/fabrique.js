var check = require( "./config/config.js").check;

function Fabrique( config ) {
    this.config = config;

    this.model = function( name ) {
        console.log( "use model: " + name);
    };
};


exports.create = function( config ) {
  if( !check( config ) ) {
      throw "Coudldn't initialize fabrique. Check config!";
  }

  var rval = new Fabrique( config );

  return rval;
};