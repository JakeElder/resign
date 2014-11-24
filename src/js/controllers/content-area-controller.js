//==============================================================================
// Dependencies
//==============================================================================

var $                       = require('jquery');
var _                       = require('underscore');
var Controller              = require('controller');

var View                    = require('../views/content-area-view');
var ContentSlidesController = require('./content-slides-controller');


//==============================================================================
// Constructor
//==============================================================================

var ContentAreaController = function() {
  Controller.apply(this, arguments);

  this.view             = new View();
  this.$el              = this.view.$el;
  this.contentSlidesController = new ContentSlidesController();

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
  $.when(this.contentSlidesController.ready).then(this._handleSubViewsReady);
};

ContentAreaController.prototype._handleSubViewsReady = function() {
  this.contentSlidesController.$el.appendTo(this.$el);
  this.trigger('init');
};


//==============================================================================
// Export
//==============================================================================

module.exports = ContentAreaController;

