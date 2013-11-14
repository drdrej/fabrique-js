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
var _ = require( "underscore" );
var path = require( "path" );

/**
 * function to resolve path.
 *
 * @param dir
 * @param file
 */
module.exports = function resolve( dir, file ) {
    var root = dir;
    if( !_.isString(dir) ) {
        LOGGER.warn( "can't resolve a path, because passed parameter:dir is not a string. dir = " + dir );
        return false;
    }

    if( !_.isString(file) ) {
        LOGGER.warn( "can't resolve a path, because passed parameter:file is not a string. file = " + file );
        return false;
    }

    var full = dir + "/" + file;
    var normalized = path.normalize( full);

    return path.resolve( normalized );
};