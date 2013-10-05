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

    /**
     * Erklärung:
     * -------------------------------------------------------------------------
     * filter() :
     *    value if( accept ) -> value wird weiter verarbeitet.
     *    if( value not accept ) -> value wird im nächsten Schritt übersprungen.
     *
     * decide()
     *    -> return events, damit dann der stream gespaltet und weiterverarbeitet werden kann
     *
     * reduce()
     *
     * apply( function )
     *    -> führt eine funktion auf dem Element aus.
     */
    var dbClasses = fabrique.model( "./filename.js")
        .filter( function(value) {

        } )

        .decide( function(value) {

        });

    /*
    fabrique
        .query()
        .filter()
        .query().apply();

*/


};