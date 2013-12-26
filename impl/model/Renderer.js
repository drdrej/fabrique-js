var S = require('string');
var exists = require('../config/Path.js').exists;
var fs = require('fs');
var _ = require('underscore');

/**
 * @param fab instance of fabrique
 * @param name resource-name
 *
 * @constructor
 */
var Renderer = function (fab, name, output) {
    this.filters = [];
    this.model = fab.model;
    this.output = fab.config.output;
    this.work = fab.work;
    this.templates = fab.templates;

    this.name = name;
    this.file = modelFile(name);
    this.tmplFile = templateFile(name);
    this.template = this.templates + "/" + this.tmplFile;

    this.renderedFile = "dump.txt";

    if (_.isString(output)) {
        this.renderedFile = this.output + "/" + (output ? output : name);
    } else if (_.isFunction(output)) {
        this.renderedFile = output;
    } else {
        console.log(output);
        throw new Error("Unsupported output-type: " + output);
    }

};

var templateFile = function (name) {
    return name + ".hbs";
};

var modelFile = function (name) {
    return name + ".hbs.json";
};

/**
 * load a model for template:
 *     <name> + '.hbs.json';
 *
 * try the following path:
 * 1. fabrique/work-Directory
 * 2. fabrique/model-Directory
 * 3. template-Directory.
 */
Renderer.prototype._useModel = function () {
    var file = this.file;

    var work = this.work + "/" + file;
    console.log("-- load model for rendering: " + work);

    if (exists(work)) {
        return require(work);
    }

    console.warn("-- couldn't load model: " + work);

    var model = this.model + "/" + file;
    console.log("-- load model for rendering: " + model);

    if (exists(model)) {
        return require(model);
    }

    console.warn("-- couldn't load model: " + work);

    var template = this.templates + "/" + file;
    if (exists(template)) {
        console.log("-- load template-default-model: " + template);
        return require(template);
    }

    console.warn("-- couldn't load model: " + template);
    console.error("-- couldn't identify & load model for template: " + this.tmplFile);

    return;
};

Renderer.prototype._writeOutput = function (rendered) {
    if (exists(this.renderedFile)) {
        var now = new Date().getTime();
        console.log("-- file exists: " + this.renderedFile + " -> overwrite it!");
    }

    var Path = require('path');
    var dirs = Path.dirname(this.renderedFile);

    var W = require('wrench');
    W.mkdirSyncRecursive(dirs, 0777);

    fs.writeFileSync(this.renderedFile, rendered, {
        encoding: 'utf8',
        flag: 'w+'
    });
};


Renderer.prototype._useTemplate = function () {
    var input = this.template;
    var Handlebars = require("handlebars");
    var handlebars = Handlebars.create();

    // TODO: Delimiter einbinden.
    handlebars.registerHelper('D', function (ctx, options) {
        /*var out = "<ul>";

         for(var i=0, l=items.length; i<l; i++) {
         out = out + "<li>" + options.fn(items[i]) + "</li>";
         }

         return out + "</ul>";
         */

        return ", ";

    });

    console.log("-- load & compile template");
    var source = fs.readFileSync(input, "utf8");

    var rval = handlebars.compile(source);
    console.log("-- handlebars-template successful loaded.");

    return rval;
};

Renderer.prototype.collapseSpace = function() {
    return this.filter( function(rendered) {
        var S = require( 'string' );
        return S(rendered).collapseWhitespace().s;
    });
};


Renderer.prototype.filter = function( filter ) {
    this.filters.push(filter);
    return this;
};

Renderer.prototype.render = function (json) {
    /* if( options && _.isObject(options) ) {

    } */

    var model;
    if (json && _.isObject(json)) {
        console.log("-- use passed json to render template.");
        model = json;
    } else {
        model = this._useModel();
    }

    if (!model) {
        console.error("-- couldn't render template [" + this.tmplFile + "].");
        return;
    }

    var template = this._useTemplate();

    // validate?
    var rendered = template(model);

    var result = rendered;
    _.each(this.filters, function(filter){
         result = filter(result);
    });

    if (_.isString(this.renderedFile)) {
        this._writeOutput(result);
    } else if (_.isFunction(this.renderedFile)) {
        this._consumeOutput(result);
    } else {
        throw new Error("unsupported render.output = " + this.renderedFile);
    }
};

Renderer.prototype._consumeOutput = function (rendered) {
    console.log("---------------- PSPA start");
    this.renderedFile(rendered);

//     var space = fabrique.workspace( this.name );

    console.log("---------------- PSPA end");
};

exports.create = function (fab, name, outputFile) {
    if (!_.isObject(fab)) {
        throw new Error("passed param:fab is NULL.");
    }

    if (!_.isString(name))
        throw new Error("passed param:name is not a String. value = " + name);

    if( !outputFile || _.isNull(outputFile) ) {
        console.log( "--> skip output: name == " + name + ", fab? " + fab);
        // return null;
    } else if (!(_.isString(outputFile) || _.isFunction(outputFile))) {
        throw new Error("param:outputFile supports only String and Function().");
    }

    return new Renderer(fab, name, outputFile);
};
