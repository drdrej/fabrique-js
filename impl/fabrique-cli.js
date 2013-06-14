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

var LOGGER = require( "fabrique-log" ).logger;
var sdk = require( "./sdk/index.js");

var _ = require( "underscore" );
var prepareParams = require( './fabrique-cli-arguments.js' );


var params = prepareParams();
var project = sdk.loadModel( params.project );

if( !_.isArray(params.tasks) ) {
    LOGGER.error( "var params.task is not an Array: params.tasks = " + params.tasks );
    return;
}

function loadCommand( desc ) {
    var fabriqueID = "fabrique-" + desc.name;

    var module = require( fabriqueID );
    module.desc = desc;

    // TODO module not found.

    return module;
}

/**
 * Desc commands:
 *
 * @returns {Array}
 */
function commands() {
    var commands = desc.commands;

    if( !_.isArray(commands) ) {
        LOGGER.error( "Task = '" + name + "' has no commands." );
        return [];
    }

    var rval = [];
    commands.forEach( function( commandDesc ) {
        var name = commandDesc.name;

        // TODO validate name!

        var command = loadCommand( commandDesc );

        command.exec = function() {
            LOGGER.log( "exec command: " + this.desc.name );
        }

        rval.push( command );
    });

    return rval;
}

function loadTaskDesc( name ) {
    var identify = "./tasks/" + name + ".json";
    var path = sdk.resolvePath( indentify );
    var desc = sdk.loadModel( path );

    // TODO: prepare parameters?

    desc.commands = commands;

    return desc;
};

params.tasks.forEach( function( task ) {
    LOGGER.log( "load task: " + task );

    var taskDesc = loadTaskDesc( task );
    var commands = taskDesc.commands();

    LOGGER.log("task = " + task + ": commands loaded.");

    commands.forEach( function( cmd )  {
       cmd.exec( params );
    });

});
