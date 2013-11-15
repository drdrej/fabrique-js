var _ = require( "underscore" );

var Cmd = function (def) {
    this.def = def;
};

Cmd.prototype.exec = function () {
    console.log("skip cmd: " + this.def.name);
};

Cmd.prototype.ext = function(ext) {
   this.exec = ext.exec;
   this.args = ext.args;
   var args = this.args;

    // bind opt-parser :::
    var optparse = require('optparse');
    var switches = [];
    _.each( this.args, function(arg) {
        switches.push([ shortName(arg.short), fullName(arg.name, arg.type), "command description" ]);
    });

    var parser = new optparse.OptionParser(switches);
    _.each( this.args, function(arg) {
        // console.log( "-- bind cli.parser: " + arg.name + " to handler: " + arg.handler );
        parser.on(arg.name, arg.handler);
    });

    this.argsParser = parser;
};

Cmd.prototype.cli = function (args) {
    this.argsParser.parse(args);
};

exports.create = function (def) {
    var module = "./" + def.name + "/" + def.name + ".js";
    console.log("load command: " + module);

    try {
        var ext = require(module);
    } catch (err) {
        console.error("command " + def.name + " doesn't exists. use list-commands to list all implemented commands.");
        return null;
    }

    var cmd = new Cmd(def);
    cmd.ext(ext);

    return cmd;
};


var shortName = function(short) {
    return "-" + short;
};

var fullName = function(name, type) {
    return "--" + name + " " + type;
};