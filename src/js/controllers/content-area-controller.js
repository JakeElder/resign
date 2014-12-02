//==============================================================================
// Dependencies
//==============================================================================

var $                       = require('jquery');
var _                       = require('underscore');
var Controller              = require('controller');
var Parse                   = require('parse');
var disposition             = require('disposition');
var content                 = require('content');
var settings                = require('settings');
var viewModel               = require('view-model');

var View                    = require('../views/content-area-view');
var ContentSlidesController = require('./content-slides-controller');
var SpotlightController     = require('./spotlight-controller');
var TAndCController         = require('./t-and-c-controller');
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
  this.tAndCController         = new TAndCController();

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
  $.when(content.ready, disposition.ready).then(this._initSlideCollection);
  $.when(
    this.spotlightController.ready,
    this.contentSlidesController.ready,
    this.tAndCController.ready
  ).then(this._handleSubViewsReady);
};

ContentAreaController.prototype._initSlideCollection = function() {
  this.slideCollection = new SlideCollection();
  this.slideCollection.fetch({ success: this._handleCollectionFetched });
};

ContentAreaController.prototype._handleCollectionFetched = function(collection) {
  var contentAreaController = this;
  $.when(
    disposition.ready,
    content.ready,
    settings.ready
  ).then(function() {
    contentAreaController._initCollection(collection);
  });
};

ContentAreaController.prototype._initCollection = function(collection) {
  collection.process({
    composition: disposition.slideComposition,
    prefer: disposition.contentType
  });
  collection.add(this._getOutroSlideModel());
  viewModel.set('slideCollection', collection);
  viewModel.trigger('ready:slideCollection');
};

ContentAreaController.prototype._handleSubViewsReady = function() {
  this.$el.find('.content-area__slideshow-container-inner').append(
    this.spotlightController.$el,
    this.contentSlidesController.$el
  );
  this.$el.find('.content-area__t-and-c-container').append(
    this.tAndCController.$el
  );
  this.trigger('init');
};

ContentAreaController.prototype._getOutroSlideModel = function() {
  return new SlideModel({
    cID: 'OUTRO',
    content: content.get('OUTRO_COPY'),
    tAndCLinkCopy: content.get('SEE_T_AND_C_LINK_COPY'),
    spotlightCtaCopy: content.get('SPOTLIGHT_OUTRO_CTA_COPY_' + disposition.contentType),
    spotlightCtaLink: settings.get('SPOTLIGHT_OUTRO_CTA_LINK_' + disposition.contentType)
  });
};


//==============================================================================
// Export
//==============================================================================

module.exports = ContentAreaController;


