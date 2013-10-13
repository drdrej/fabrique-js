var _ = require( "underscore" );


function InputPath( path ) {
    this.path = path;
    this.lastPromise = null;

    this.accept = function( newPromise ) {
       if(_.isNull(this.lastPromise)) {
           this.lastPromise = newPromise;
       } else {
           this.lastPromise.then( function() {
               return newPromise;
           }).then( null, function(error) {

           });
       }
    };

//        model( "*.schema.json" )
//           .select().filter().apply(
//             function( value ) { });



    /**
     *
     * @param pattern
     * @returns {this}
     */
    this.model = function( pattern ) {
        // TODO: validate pattern/arguments before append to primes-list.
        var use = require( "./use-model.js").useModel;
        this.accept( use(pattern) );

        return this;
    };


    this.apply = function( handler ) {
        this.lastPromise.then( function(value) {
            return handler(value);
        }).then(null, function() {
            console.error( "!! problem..." );
            throw new Error("!! apply is broken...." );
        });
    };

};

exports.create = function( path ) {
    console.log( "-- use path: " + path );

    return new InputPath(path);
};