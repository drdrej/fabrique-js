/**
 * you can write tasks as javascript.
 *
 * @param fabrique  never NULL
 * @param project never NULL
 */


module.exports = function task( fabrique, project ) {
    fabrique
        .query( "> .test " )
        .filter( function(result) {
            //result wird umgemappt.
            // kann man später mit unify umsetzen.
            return result;
        })
        .apply( project, function(result) {
            fabrique.cmd( "render" ).exec( result );
        });

    /*
    fabrique
        .query()
        .filter()
        .query().apply();

*/


};