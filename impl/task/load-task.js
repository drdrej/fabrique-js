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

var LOGGER = require( "fabrique-log" ).logger;
var sdk = require( "../sdk/index.js");
var commands = require( './task-get-commands.js' );
var validateTask = require( './validate-task-desc.js' );

/**
 * loads a task by name.
 *
 * @param name valid task name.
 * @returns {*} task description as an object
 */
module.exports = function load( task ) {
    // var identify = "./tasks/" + task.name + ".json";
    // var path = sdk.resolvePath( identify );
    LOGGER.log( "load task: " + task.name );
    var desc = sdk.loadModel( task.path );

    validateTask( desc );

    desc.def = task;
    desc.def.commands = desc.commands;
    desc.commands = commands;

    return desc;
};