var Cmd = function (def) {
    this.def = def;
};

Cmd.prototype.exec = function () {
    console.log("exec cmd: " + this.def.name);
};

Cmd.prototype.resolveGenerator = function () {

};

exports.create = function (def) {
    var module = "./" + def.name + "/" + def.name + ".js";
    console.log("load command: " + module);
    var ext = require(module);

    var cmd = new Cmd(def);
    cmd.exec = ext.exec;

    return cmd;
};