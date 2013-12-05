var assert = require("assert");
var _ = require("underscore");
var create = require("../impl/FabriqueEnv.js").create;

describe('Fabrique', function () {
    it("*.create(root)", function (done) {
        console.log("-- init fabrique");
        var fabrique = create(__dirname + "/project1/");
        var dump = fabrique.dump;


        fabrique.input("*.schema.json")
            .transform('.name', function () {
            })
            .apply(function (selected) {
                done();
            });

        fabrique.input("*.json")
            .transform('.name', function (element) {
                console.log("####################### YEAH!!!");
                return element;
            })
            .apply(function (selected) {
                done();
            });

        fabrique.input("app.json")
            .transform('.name', function () {

            })
            .apply(function (selected) {
                dump("MyFile.xml").create({
                    test: "TEST IT"
                });

                done();
            });
    });
});
