var _ = require('underscore');
var out = require("../../out/out.js" );

var Create = function () {
    ;
};

Create.prototype.configure = function () {
    var routes = this.config.routes;
    this.initRoutes(routes);
}

Create.prototype.validateCLI = function() {
    var opts = this.options;

    var hasResource = opts.resource && _.isString(opts.resource) && (opts.resource.length > 0);
    var hasToolset = opts.toolset && _.isString(opts.toolset) && (opts.toolset.length > 0);

    if( hasResource && hasToolset ) {
        return true;
    }

    if( !hasResource ) {
         console.error("-- fabrique needs an option --resource (short: -r) $path");
    }

    if( !hasToolset ) {
        console.error("-- fabrique needs an option --toolset (short: -t) $toolset.id");
    }

    return false;
};

Create.prototype.initRoutes = function (routes) {
    var crossroads = require('crossroads');

    if (!_.isArray(routes)) {
        console.error("couldn't config routes. skip init-method.");
        return;
    }

    _.each(routes, function (entry) {
        console.log(">>>>> route :::: " + entry);
        console.log(entry);

        // TODO: hier muss die richtige route aus der config aufgenommen werden
        // der header für den call ist immer unterschiedlich.
        var route = crossroads.addRoute(entry.route);
        route.matched.add(entry.handler);

    });

    // TODO: Routes konfigurieren:
    // RouteHandler binden.

};

Create.prototype.exec = function () {
    // route finden/feuern
    // Generator ausführen

    // Route feuern
    // im Handler wird der Generator aufgerufen.
};


exports.create = function () {
   return new Create();
}




/**
 * creates args to parse them with cmd.args.parser
 *
 * @param cmd Instance of Cmd.js
 *
 * @returns {Array}
 */
exports.args = function (cmd) {
    /*
    if( !_.isFunction(that.putOption) ) {
        console.error( "couldn't bind putOption() to " );
    } */

    return [
        {

            name: "resource",
            type: "TEXT",
            short: "r",
            handler: function(option, value) {
                cmd.putOption(option, value);
            }
        },
        {

            name: "toolset",
            type: "TEXT",
            short: "t",
            handler: function(option, value) {
                cmd.putOption(option, value);
            }
        }
    ];

};