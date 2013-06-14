fabrique-render
===============
**-- experimental**

*Description*:
Render txt-files in fabrique-js based on handlebars-templates and json-data.

## Philosophy
1. simple.
2. write only tests if something not work.
3. everything is a function.


## Usage

Install with npm:
```
>npm install fabrique-render -g
```

Use console to call renderer.
```
cli>fabrique-render -m "./example/hello-world.json" -s "./example" -d "c:\temp" hello-world.txt.tmpl
```

Output in console:
```
-- load module
[VALUE] path = C:\home\projects\fabriquejs-core\sources\fabrique-render\example\hello-world.json
[SUCCESSFUL] module loaded. path = C:\home\projects\fabriquejs-core\sources\fabrique-render\example\hello-world.json
-- render: Hello {{WORLD}}!


[SUCCESSFUL] write rendered file to: c:\temp\hello-world.txt.tmpl
```

## How to help
1. share and speak about it.
2. fork, contribute code, tests, translations.
3. donate.

[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=D7GL3MAY2KYLG)

Thank you for usage & support!
   Andreas Siebert

## License

*MIT License*

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

(c) 2013 Andreas Siebert, touchableheroes.com
ask at touchableheroes.com