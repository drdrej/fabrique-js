
function InputPath( path ) {
    this.path = path;
    this.promises = [];

    /*var wrench = require('wrench');

    this.model = function( pattern ) {
        wrench.readdirRecursive('my_directory_name',
            function(error, current) {

        });


        promise.then( fnc() {
             nextPromise.then()
        })

        model( "*.schema.json" ).select().filter().apply(
             function( value ) { });

             promise -> promise -> promise

             Bedingung: model() wird ausgeführt und das Ergebnis an apply weiter gegeben
    }*/


    this.model = function( pattern ) {
        // TODO: validate pattern/arguments before append to primes-list.
        var use = require( "./use-model.js").useModel;

        this.promises.push( {
            promise : use,
            params : [ pattern ]
        });

        return this;

        /*{
            before : function () {
                use(pattern).then( function(value) {
                    console.log( "-- handle file: " + value );

                    this.apply()
                });
            },

            apply : function( handler ) {
                this.before( );
                console.log( "-- call apply.handler() " );
             }
        };*/
    };


    this.apply = function( handler ) {

        // take first promise
        // then() -> take second promise
        this.promises
    };

};

exports.create = function( path ) {
    console.log( "-- use path: " + path );

    return new InputPath(path);
};