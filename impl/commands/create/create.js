
var Cmd = function( def ) {
   this.def = def;
};

Cmd.prototype.exec = function() {
   console.log("exec cmd: " + this.def.name);
};

exports.create = function(def) {
    return new Cmd(def);
}