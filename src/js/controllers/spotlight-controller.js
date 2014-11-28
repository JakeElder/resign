//==============================================================================
// Dependencies
//==============================================================================

var Controller     = require('controller');
var $              = require('jquery');
var _              = require('underscore');
var viewModel      = require('view-model');

var View           = require('../views/spotlight-view');
var CollectionView = require('../views/spotlight-subject-collection-view');


//==============================================================================
// Constructor
//==============================================================================

var SpotlightController = function() {
  Controller.apply(this, arguments);
  this.view = new View();
  this.$el = this.view.$el;
  this.collectionView = new CollectionView();
  viewModel.on('ready:slideCollection', this._handleSlideCollectionReady, this);
};
var proto = SpotlightController.prototype;
$.extend(proto, Controller.prototype);


//==============================================================================
// Public functions
//==============================================================================

proto._handleSlideCollectionReady = function() {
  this.collectionView.setCollection(viewModel.get('slideCollection'));
  this.collectionView.$el.appendTo(this.$el);
  this.trigger('init');
};


//==============================================================================
// Export
//==============================================================================

module.exports = SpotlightController;

