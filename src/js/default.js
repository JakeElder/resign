//==============================================================================
// Dependencies
//==============================================================================

var SlidesController = require('./controllers/slides-controller');
var _                = require('underscore');
var $                = require('jquery');


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
  this.slidesController = new SlidesController();
  $.when(this.slidesController.ready).done(this.render);
};

App.prototype.render = function(controllers) {
  this.slidesController.$el.appendTo('body');
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

