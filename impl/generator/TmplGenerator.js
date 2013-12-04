var _ = require( 'underscore' );

var Generator = function(fabrique, def) {
  ;
};

Generator.prototype.generate = function(){
    // simplest template based generator.
    // resolves his input model and output and dump it.
    this.output(this.model());
};

// INFO: die generate-methode wird aufgerufen.