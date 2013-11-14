
var _ = require( "underscore" );

/**
 * Checks the config-configuration:
 *
 * @param config NOT NULL.
 *
 * @returns {boolean} true, if factory is successful initialized
 */
exports.check = function( config ) {
  if(!_.isObject(config) ) {
      var msg = "Couldn't init fabrique. config is NULL";
      console.error( msg );
      return false;
  }

  if( !_.isObject( config.input ) ) {
      var msg = "[ERROR] Couldn't init fabrique. 'config.input' is MISSING.";
      console.error( msg );
      return false;
  }

  return true;
};