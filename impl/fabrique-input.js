var _ = require( "underscore" );


function InputPath( path ) {
    this.path = path;
    this.lastPromise = null;

    this.accept = function( newPromise ) {
       if(_.isNull(this.lastPromise)) {
           this.lastPromise = newPromise;
       } else {
           var promise = this.lastPromise;

           promise.then( function() {
               return newPromise;
           }).then( null, function(error) {
               throw new Error( "couldn't execute last promise." );
           });

           this.lastPromise = newPromise;
       }
    };


    /**
     *
     * @param pattern
     * @returns {this}
     */
    this.model = function( pattern ) {
        // TODO: validate pattern/arguments before append to primes-list.
        var use = require( "./use-model.js").useModel;
        // this.accept( use(pattern) );

        use(pattern).then( function(file){
            console.log( file );
            console.log( "-- found file: " + file );
            return "done";
        }).then(null, function(error) {
            console.error( error );
            console.error( "!! couldn't resolve promise: " + error );
            return "error";
        });

        return this;
    };


    this.apply = function( handler ) {
        /*
        var toApply = this.lastPromise;
        if(_.isNull(toApply) ) {
            throw new Error( "This is not ");
        }

        if(!_.isFunction(toApply.then) ) {
            throw new Error( "This is not a correct call." );
        }

        toApply.then( function(value) {
            return handler(value);
        }).then(null, function(err) {
            console.error( "!! problem..." );
            throw new Error("!! apply is broken...." );
        });
        */
    };
};

exports.create = function( path ) {
    console.log( "-- use path: " + path );

    return new InputPath(path);
};