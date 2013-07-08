/**
 * fabrique.query( "> .test " ).apply( ctx, function( result ) {
 *                       // do something.
 *                       fabrique.command( "render" ).exec( result );
 *
 *       );
 */
module.exports = function query( query ) {
    return {
        query : query,
        apply : function ( ctx, callback ) {

        }
    };
};

/*
    .filter( function(result) {
        //result wird umgemappt.
        // kann man später mit unify umsetzen.
        return result;
    })
    .apply( project, function(result) {
        fabrique.cmd( "render" ).exec( result );
    });
*/

/*
 fabrique
 .query()
 .filter()
 .query().apply();
