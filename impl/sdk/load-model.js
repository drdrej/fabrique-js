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

/**
 * tries to load a *.json file. if a passed file couldn't
 * be loaded it returns an empty opbject.
 *
 * @param path
 *
 * @returns {object} never null
 */
module.exports = function load( path ) {
        LOGGER.log( "load module" );
        LOGGER.value( "path", path );

        try {
            var rval = require( path );
            if( rval ) {
                LOGGER.success( "module loaded. path = " + path  );
                return rval;
            }

            LOGGER.warn( "couldn't load module. path = " + path  );

            return {};
        } catch( e ) {
            LOGGER.exception( e );
            LOGGER.warn( "couldn't load module. path = " + path );

            return {};
        }
};
