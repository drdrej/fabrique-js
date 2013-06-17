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



/**
 * Usage from command-line:
 *
 * > fabrique -p project.json <task-name> (<task-name>)*
 *
 * executes tasks.
 *
 * Example:
 * ---------
 * >fabrique build-project compile-project jar-project
 *
 * this call will use default project.json file and executes
 * the tasks build-project and compile-project.
 */
var _ = require( "underscore" );
var LOGGER = require( "fabrique-log" ).logger;
var sdk = require( "./sdk/index.js");

var prepareParams = require( './fabrique-cli-arguments.js' );

var loadTaskDesc = require( './task/load-task.js' );


var params = prepareParams();

var project = {
};

// fix project-var.
if( _.isString(params.project) ) {
  project = sdk.loadModel( params.project );
}


if( !_.isArray(params.tasks) ) {
    LOGGER.error( "var params.task is not an Array: params.tasks = " + params.tasks );
    return;
}







params.tasks.forEach( function( task ) {
    LOGGER.log( "handle task: " + task.name );

    var taskDesc = loadTaskDesc( task );
    var commands = taskDesc.commands();

    LOGGER.log("task = " + task.name + ": commands loaded.");

    commands.forEach( function( cmd )  {
       cmd.exec( params );
    });

});
