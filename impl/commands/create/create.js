var _ = require('underscore');

var Create = function () {
    ;
};

Create.prototype.configure = function () {
    var routes = this.config.routes;
    this.initRoutes(routes);
}

Create.prototype.initRoutes = function (routes) {
    var crossroads = require('crossroads');

    if (!_.isArray(routes)) {
        console.error("couldn't config routes. skip init-method.");
        return;
    }

    _.each(routes, function (entry) {
        console.log(">>>>> route :::: " + entry);
        console.log(entry);
    });

    /*
     var sectionRoute = crossroads.addRoute('/{section}/{id}');
     function onSectionMatch(section, id){
     console.log(section +' - '+ id);
     }

     sectionRoute.matched.add(onSectionMatch);
     //will match `sectionRoute` passing "news" and `123` as param
     crossroads.parse('/news/123');

     return crossroads;
     */
};

Create.prototype.exec = function () {
    // route finden/feuern
    // Generator ausführen
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
                console.log("+++++++++++++++++++++++++++++++++++++++");
                console.log(cmd);

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