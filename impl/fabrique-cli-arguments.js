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

var LOGGER = require("fabrique-log").logger;
var _ = require( "underscore" );
var resolvePath = require('./project/resolve-path.js');
var fs = require('fs');

module.exports = function prepare() {
    /** context to store parameter to call a render-command with
     * resolved pathes.
     *
     * @type {{object}}
     */
    var params = {
        tasks: []
    };

    var argv = require('optimist')
        .usage('$0 --project "project.json" task1 task2 task3 ...')

        .alias('p', 'project')
        .describe('p', 'name of project.json file. default = project.json')

        .check(function (argv) {
            if (!argv._.length) {
                throw 'Must name at least one task.';
            }

            argv._.forEach(function ( task ) {
                var taskFile = "./tasks/" + task + ".json";

                var path = resolvePath( process.cwd(), taskFile);

                try {
                    fs.statSync( path );
                    params.tasks.push( path );
                } catch (err) {
                    LOGGER.log('Unable to open task file "' + path + '"');
                    LOGGER.error("error :: " + err);

                    throw userMsg;
                }
            });
        })

        .argv;

    return params;
}
