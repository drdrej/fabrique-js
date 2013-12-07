var S = require('string');
var exists = require('../config/Path.js').exists;
var fs = require('fs');

/**
 * @param fab instance of fabrique
 * @param name resource-name
 *
 * @constructor
 */
var Renderer = function (fab, name, output) {
    this.model = fab.model;
    this.output = fab.config.output;
    this.work = fab.work;
    this.templates = fab.templates;

    this.name = name;
    this.file = modelFile(name);
    this.tmplFile = templateFile(name);
    this.template = this.templates + "/" + this.tmplFile;

    this.renderedFile = this.output + "/" + (output ? output : name);
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
Renderer.prototype.useModel = function () {
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
        console.log( "-- load template-default-model: " + template);
        return require(template);
    }

    console.warn("-- couldn't load model: " + template);
    console.error("-- couldn't identify & load model for template: " + this.tmplFile);

    return;
};

Renderer.prototype.write = function (rendered) {
    if (exists(this.renderedFile)) {
        var now = new Date().getTime();
        console.log("-- file exists: " + this.renderedFile + " -> overwrite it!");
    }

    var Path = require('path');
    var dirs = Path.dirname(this.tmplFile);

    var W = require('wrench');
    W.mkdirSyncRecursive(dirs, 0777);

    fs.writeFileSync(this.renderedFile, { encoding: 'utf8'});
};


Renderer.prototype.useTemplate = function () {
    var input = this.template;
    var Handlebars = require("handlebars");

    console.log("-- load & compile template");
    var source = fs.readFileSync(input, "utf8");

    var rval = Handlebars.compile(source);
    console.log("-- handlebars-template successful loaded.");

    return rval;
};

Renderer.prototype.render = function (json) {
    var model;
    if (json && _.isObject(json)) {
        console.log("-- use passed json to render template.");
        model = json;
    } else {
        model = this.useModel();
    }

    if (!model) {
        console.error("-- couldn't render template [" + this.tmplFile + "].");
        return;
    }

    var template = this.useTemplate();

    // validate?
    var rendered = template(model);
    this.write(rendered);
};

exports.create = function (fab, name, outputFile) {
    return new Renderer(fab, name, outputFile);
};
