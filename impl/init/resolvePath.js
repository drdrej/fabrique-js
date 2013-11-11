var S = require("string");

exports.resolve = function( path, root ) {
    var pathS = S(path);

    var isRelativ = pathS.startsWith( "." );

    if( isRelativ ) {
        console.log( "-- resolve relative path." );

        if( !isValidRoot(root) ) {
            console.error( "## couldn't resolve relative path. passed param:root is not valid. root = ... "  );
            console.error( root);

            return path;
        }

        var rootS = S(root);
        if( rootS.endsWith( "/" ) ) {
            var cutPath = path;
            if( pathS.startsWith("/") ) {
                cutPath = pathS.substr(1);
            }

            return root + cutPath;
        } else {
            var cutPath = S(path).substr(1);
            if( cutPath.startsWith("/") ) {
                return root + cutPath.toString();
            } else {
                return root + "/" + path;
            }
        }
    } else {
        console.log( "-- ignore root = " + root);
        console.log( "-- resolve absolute path: " + path);

        return path;
    }

    console.log( "-- nothing to do. use original path = " + path);
    return path;
};

var isValidRoot = function(root) {
    return true;
};
