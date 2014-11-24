//==============================================================================
// Dependencies
//==============================================================================

var $                = require('jquery');
var _                = require('underscore');
var Controller       = require('controller');

var View             = require('../views/content-area-view');
var SlidesController = require('./slides-controller');


//==============================================================================
// Constructor
//==============================================================================

var ContentAreaController = function() {
  Controller.apply(this, arguments);

  this.view             = new View();
  this.$el              = this.view.$el;
  this.slidesController = new SlidesController();

  this._bindMethodContexts();
  this._bindEventHandlers();
};
$.extend(ContentAreaController.prototype, Controller.prototype);


//==============================================================================
// Private functions
//==============================================================================

ContentAreaController.prototype._bindMethodContexts = function() {
  this._handleSubViewsReady = _.bind(this._handleSubViewsReady, this);
};

ContentAreaController.prototype._bindEventHandlers = function() {
  $.when(this.slidesController.ready).then(this._handleSubViewsReady);
};

ContentAreaController.prototype._handleSubViewsReady = function() {
  this.slidesController.$el.appendTo(this.$el);
  this.trigger('init');
};


//==============================================================================
// Export
//==============================================================================

module.exports = ContentAreaController;

