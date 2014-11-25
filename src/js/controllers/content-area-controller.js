//==============================================================================
// Dependencies
//==============================================================================

var $                       = require('jquery');
var _                       = require('underscore');
var Controller              = require('controller');
var Parse                   = require('parse');

var View                    = require('../views/content-area-view');
var ContentSlidesController = require('./content-slides-controller');
var SpotlightController     = require('./spotlight-controller');
var SlideCollection         = require('../collections/content-slide-collection');
var SlideModel              = require('../models/slide');


//==============================================================================
// Constructor
//==============================================================================

var ContentAreaController = function() {
  Controller.apply(this, arguments);

  this.view = new View();
  this.$el  = this.view.$el;

  this.contentSlidesController = new ContentSlidesController();
  this.spotlightController     = new SpotlightController();

  this.slideCollection = new SlideCollection([], { query: this._getQuery() });
  this.slideCollection.fetch({ success: this._handleCollectionFetched });

  this._bindMethodContexts();
  this._bindEventHandlers();
};
$.extend(ContentAreaController.prototype, Controller.prototype);


//==============================================================================
// Private functions
//==============================================================================

ContentAreaController.prototype._bindMethodContexts = function() {
  this._handleSubViewsReady     = _.bind(this._handleSubViewsReady, this);
  this._handleCollectionFetched = _.bind(this._handleCollectionFetched, this);
};

ContentAreaController.prototype._bindEventHandlers = function() {
  $.when(
    this.spotlightController.ready,
    this.contentSlidesController.ready
  ).then(this._handleSubViewsReady);
};

ContentAreaController.prototype._getQuery = function() {
  return new Parse.Query(SlideModel)
    .matches('cID', this._getQueryRegex());
};

ContentAreaController.prototype._getQueryRegex = function() {
  return /.*/;
};

ContentAreaController.prototype._handleCollectionFetched = function(collection) {
  this.contentSlidesController.setCollection(collection);
  this.spotlightController.setCollection(collection);
};

ContentAreaController.prototype._handleSubViewsReady = function() {
  this.$el.append(
    this.spotlightController.$el,
    this.contentSlidesController.$el
  );
  this.trigger('init');
};


//==============================================================================
// Export
//==============================================================================

module.exports = ContentAreaController;

