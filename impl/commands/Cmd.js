var _ = require( "underscore" );

var Cmd = function (def) {
    this.options = {};
    this.def = def;
};

Cmd.prototype.ext = function(impl) {
    if( !impl ) {
        console.error( "couldn't extend command-implementation. because passed param:ext is NULL/undefined." );
        return null;
    }

    this.exec = impl.exec;
    this.configure = impl.configure;
    this.validateCLI = impl.validateCLI;
    this.initRoutes = impl.initRoutes;
};

Cmd.prototype.bind = function( extension ) {
    this.bindArgs(extension);

    var impl = extension.create();
    this.ext(impl);
};

Cmd.prototype.bindArgs = function(ext) {
    this.args = ext.args(this);

    // bind opt-parser :::
    var optparse = require('optparse');
    var switches = [];
    _.each( this.args, function(arg) {
        switches.push([ shortName(arg.short), fullName(arg.name, arg.type), "command description" ]);
    });

    var parser = new optparse.OptionParser(switches);
    _.each( this.args, function(arg) {
        parser.on(arg.name, arg.handler);
    });

    this.argsParser = parser;
};


Cmd.prototype.putOption = function( option, value ) {
    console.log("-- uses " + option + ": " + value);
    this.options[option] = value;
};


Cmd.prototype.cli = function (args) {
    this.argsParser.parse(args);
    return this.validateCLI();
};


Cmd.prototype.configPath = function() {
    var toolset = this.toolsetPath();
    console.log( "-- toolset ::: " + toolset );

    if( toolset == null )
        return null;

    return  toolset + "/config/" + this.def.name + ".json";
};

Cmd.prototype.toolsetPath = function() {
    var name = this.options.toolset;
    console.log("-- resolve path for toolset: " + name);

    var path = null;
    _.each(this.def.fabrique.config.toolset, function(selected) {
        console.log("iterate");
        if( selected.id == name ) {
            path = selected.absolutePath;
        }
    });

    return path;
};

Cmd.prototype.loadConfig = function() {
    this.config = {};
    var path = this.configPath(this.def);

    if( !path ) {
        console.log("couldn't load toolset-configuration.");
        return;
    }

    console.log( "-- use toolset-config-path :" + path );

    try {
        this.config = require( path );
        this.configure();
    } catch( err ) {
        console.error("for command '" + this.def.name + "' configuration is broken" );
        console.error(err);

        return;
    }
};



Cmd.prototype.configure = function() {
    console.log("skip cmd.configure(): " + this.def.name);
}

Cmd.prototype.exec = function () {
    console.log("skip cmd.exec(): " + this.def.name);
};



exports.create = function (def) {
    def.module = modulePath(def);
    console.log("load command: " + def.module);

    var ext = loadCmdImpl(def);
    var cmd = new Cmd(def);
    cmd.bind(ext);

    return cmd;
};

var loadCmdImpl = function(def) {
    try {
        return require(def.module);
    } catch (err) {
        console.error("command " + def.name + " doesn't exists. use list-commands to list all implemented commands.");
        return null;
    }
};

var shortName = function(short) {
    return "-" + short;
};

var fullName = function(name, type) {
    return "--" + name + " " + type;
};

var modulePath = function(def) {
    return "./" + def.name + "/" + def.name + ".js";
};

