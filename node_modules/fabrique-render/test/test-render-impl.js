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

var assert = require("assert");
var render = require( "../impl/render-impl.js" );


describe(
    'render-impl.js',

    function() {
        describe(
            '#render()',
            function() {

                var tmpl = "Hello {{WORLD}}!";

                it(
                    'passed context is empty.',

                    function() {
                        var rendered = render( tmpl, {});
                        assert.equal( "Hello !", rendered );
                    });

                it( '1 parameter in passed context.', function() {
                    var tmpl = "Hello {{WORLD}}!";
                    var rendered = render( tmpl, {
                            WORLD :  "ME"
                        }
                    );

                    console.log( "result-query: " + rendered );
                    assert.equal( "Hello ME!", rendered );
                });
            });
    });