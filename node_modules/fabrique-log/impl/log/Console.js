/*

Copyright (c) 2012-2013 Andreas Siebert, ask@touchableheroes.com

Permission is hereby granted, free of charge, to any person obtaining 
a copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the 
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included 
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS 
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
IN THE SOFTWARE.

*/

function Log() {
   this.LOGGER_LINE_SIZE = 250;	
};

Log.prototype.out = function( msg ) {
	console.log( msg );
},

Log.prototype.log = function( msg ) {
	var isNotDefined = (msg == undefined 
			|| msg == null || msg == false);
	
	if( isNotDefined ) {
		this.out( "[ERROR] log msg is undefined." );
		return;
	}
	
	if( msg.length > this.LOGGER_LINE_SIZE ) {
		var log = "-- " + msg.substring(0,50) + "...";
		this.out( log );
		return;
	}
	
	this.out( "-- " + msg );
	
	return msg;
};

Log.prototype.value = function( name, value ) {
	this.out("[VALUE] " + name + " = " + value );
};

Log.prototype.error = function( msg ) {
	var msgCutted = this.log( msg );
	
	throw new Error( msgCutted );
};

Log.prototype.exception = function( err ) {
	this.out( err );
};

Log.prototype.skip = function( msg ) {
	return this.out( "[SKIP] " + msg );
};

Log.prototype.warn = function( msg ) {
	return this.out( "[WARN] " + msg );
};

Log.prototype.success = function( msg ) {
	return this.out( "[SUCCESSFUL] " + msg );
};

Log.prototype.catched = function( msg, err ) {
	this.out( "[CATCHED] " + msg );
	throw err;
};

Log.prototype.app = function( app ) {
	this.out( "##########################################" );
	this.out( "## name:    " + app.name );
	this.out( "## version: " + app.version );
	this.out( "##########################################" );
};

Log.prototype.chapter = function( chapter ) {
	this.out( "------------------------------------------" );
	this.out( "-- name:    " + chapter.name + " - " + chapter.version );
	this.out( "------------------------------------------" );
};

var DEFAULT_LOGGER = new Log();

module.exports = {
	logger : DEFAULT_LOGGER
};