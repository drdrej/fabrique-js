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
 * > fabrique-render -model ./my-data.json -src "..." -dest "..." file1.tmpl, file2.tmpl, file3.tmpl
 *
 * render file1 ... file3 from directory passed in "-src" parameter to directory passed in
 * "-dest" parameter.
 *
 */

var LOGGER = require( "fabrique-log" ).logger;
var _ = require( "underscore" );
var prepareParams = require( './render-cli-arguments.js' );
var render = require( "./render-impl.js" );
var loadModel = require( './project/load-model.js' );
var fs = require( 'fs' );


var params = prepareParams();
var data = loadModel( params.data );

params.templates.forEach( function( templateFile, index ) {
    try {
        var template = fs.readFileSync( templateFile, 'utf8' );
        var rendered = render( template, data );
        var output = params.output[ index ];

        fs.writeFileSync( output, rendered, 'utf8')

        LOGGER.success( 'write rendered file to: ' + output );
    } catch (err) {
        LOGGER.exception( err );
        LOGGER.warn( 'Unable to render template: "' + template + '". skip it!' );
    }
});











