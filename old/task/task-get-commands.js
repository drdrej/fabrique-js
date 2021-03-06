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

var _ = require( "underscore" );
var loadCommand = require( '../command/load-command.js' );
var LOGGER = require( "fabrique-log" ).logger;

/**
 * Desc commands:
 *
 * @returns {Array}
 */
module.exports = function commands() {
    var rval = [];

    LOGGER.log( "load commands for task: " + this.def.name );

    this.def.commands.forEach( function( commandDesc ) {
        var command = loadCommand( commandDesc );

        if( !_.isFunction( command.exec ) ) {
            LOGGER.log( "command.exec is not a function. use default exec");
            command.exec = function() {
                LOGGER.log( "exec command: " + this.desc.name );
            };

            return;
        }

        rval.push( command );
    });

    return rval;
}

