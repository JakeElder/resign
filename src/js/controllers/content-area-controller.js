//==============================================================================
// Dependencies
//==============================================================================

var $                       = require('jquery');
var _                       = require('underscore');
var Controller              = require('controller');
var Parse                   = require('parse');
var disposition             = require('disposition');

var View                    = require('../views/content-area-view');
var ContentSlidesController = require('./content-slides-controller');
var SpotlightController     = require('./spotlight-controller');
var SlideCollection         = require('../collections/content-slide-collection');
var SlideModel              = require('../models/slide');


//==============================================================================
// Constructor
//==============================================================================

var ContentAreaController = function(options) {
  Controller.apply(this, arguments);

  this.view = new View();
  this.$el  = this.view.$el;

  this.contentSlidesController = new ContentSlidesController();
  this.spotlightController     = new SpotlightController();

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
  this._initSlideCollection     = _.bind(this._initSlideCollection, this);
};

ContentAreaController.prototype._bindEventHandlers = function() {
  $.when(disposition.ready).then(this._initSlideCollection);
  $.when(
    this.spotlightController.ready,
    this.contentSlidesController.ready
  ).then(this._handleSubViewsReady);
};

ContentAreaController.prototype._initSlideCollection = function() {
  this.slideCollection = new SlideCollection([], { query: this._getQuery() });
  this.slideCollection.fetch({ success: this._handleCollectionFetched });
};

ContentAreaController.prototype._getQuery = function() {
  return new Parse.Query(SlideModel)
    .containedIn('cID', disposition.slideComposition);
};

ContentAreaController.prototype._handleCollectionFetched = function(collection) {
  // Sort models by order in disposition.slideComposition
  collection.models.sort(function(a, b) {
    var aIndex = disposition.slideComposition.indexOf(a.get('cID'));
    var bIndex = disposition.slideComposition.indexOf(b.get('cID'));
    return aIndex - bIndex;
  });
  this.contentSlidesController.setCollection(collection);
  this.spotlightController.setCollection(collection);
};

ContentAreaController.prototype._handleSubViewsReady = function() {
  this.$el.find('.content-area__container').append(
    this.spotlightController.$el,
    this.contentSlidesController.$el
  );
  this.trigger('init');
};


//==============================================================================
// Export
//==============================================================================

module.exports = ContentAreaController;

