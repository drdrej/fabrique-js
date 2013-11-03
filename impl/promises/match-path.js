var RSVP = require( "rsvp" );
var when = function( promised ) {
    return new RSVP.Promise( promised );
};

var _ = require( "underscore" );
var wrench = require( "wrench" );


exports.exec = function(root, pattern) {

    wrench.readdirRecursive(root, function(error, files) {
        console.log(files);

        if(error) {
            console.error( "!! couldn't walk recursiv over directories. something is wrong with wrench.");
            console.error(error);

            return reject(error);
        }

        handleResult(resolve, files, pattern);
    });

    return when( function(resolve, reject){
        try {

            reject("error");
        } catch(exception) {
           console.log(exception);
        }
    });
};

var handleResult = function(resolve, files, pattern) {
    if(_.isString(files) ) {
       if( shouldUse(files, pattern) ) {
           resolve(files);
       }
    } else if(_.isArray(files)){
       console.log( "-- model-candidates: " + files.length );
       console.log( files );

       _.each( files, function(file) {
           console.log( "-- push candidate: " + file);

          if( shouldUse(file, pattern) ) {
               resolve(file);
          }
       });
    }
};

var shouldUse = function(file, pattern) {
  var match = require( "minimatch" );
  var matcher = match( file, pattern );

  console.log( "##### use regExp :::" + matcher + ":pattern = " + pattern + " ::: " + file );

  return true;
};