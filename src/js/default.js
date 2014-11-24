//==============================================================================
// Dependencies
//==============================================================================

var _                     = require('underscore');
var $                     = require('jquery');

var HeaderController      = require('./controllers/header-controller');
var ContentAreaController = require('./controllers/content-area-controller');


//==============================================================================
// App
//==============================================================================

var App = function() {
  this._bindMethodContexts();
  this.init();
};


//==============================================================================
// Public functions
//==============================================================================

App.prototype.init = function() {
  this.headerController      = new HeaderController();
  this.contentAreaController = new ContentAreaController();
  $.when(
    this.headerController.ready,
    this.contentAreaController.ready
  ).done(this.render);
};

App.prototype.render = function(controllers) {
  $('body').append(
    this.headerController.$el,
    this.contentAreaController.$el
  );
};


//==============================================================================
// Private functions
//==============================================================================

App.prototype._bindMethodContexts = function() {
  this.render = _.bind(this.render, this);
};


//==============================================================================
// Go
//==============================================================================

window.app = new App();

