
var Pipe = function(source) {
    this.source = source;
    this.selectors = [];
};

Pipe.prototype.select = function( pattern ) {
    return this;
};


Pipe.prototype.transform = function( pattern ) {
    return this;
};

Pipe.prototype.apply = function( handler ) {

};

exports.create = function(source) {
   return new Pipe(source);
};