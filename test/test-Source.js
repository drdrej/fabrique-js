var assert = require("assert");
var _ = require("underscore");
var create = require("../impl/FabriqueEnv.js").create;

describe('Fabrique', function () {
    it("*.create(root)", function (done) {
        console.log("-- init fabrique");
        var fabrique = create(__dirname + "/project1/");


        /*
        fabrique.input("*.schema.json")
            .transform('.name', function () {
            })
            .apply(function (selected) {
                done();
            });
        */

        /*
        fabrique.input("*.json")
            .transform('.name', function (element) {
                console.log("####################### YEAH!!!");
                return element;
            })
            .apply(function (counted) {
                // gibt die liste der gezählten resources -> summary
                done();
            });
        */

        // TODO: pruefe die Kombi mit verschachtelten Transformationen. Ist dieser Weg überhaupt notwendig?
        fabrique.input("app.json")
            .transform('.name', function (element) {

                fabrique.dump("MyFile.xml").create( /*{
                    test: "TEST IT"
                } */);
            })
            .apply();

    });
});
