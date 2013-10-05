
function InputPath( path ) {
    this.path = path;

    var wrench = require('wrench');

    this.model = function( pattern ) {
        wrench.readdirRecursive('my_directory_name',
            function(error, current) {

        });
    }
};

exports.create = function( path ) {
    console.log( "-- use path: " + path );

    return new InputPath(path);
};