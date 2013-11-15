
exports.exec = function() {
  //console.log("#################################################-----");
  //console.log( this.def );
  //console.log("#################################################-----");
};

exports.args = [{
    name :  "resource",
    type : "STRING",
    short : "r",
    handler : function( option, value ) {
         console.log( ">>>>>>>>>>> rockn'rollll");
    }
}];