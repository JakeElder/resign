//==============================================================================
// Dependencies
//==============================================================================

var Controller     = require('controller');
var $              = require('jquery');
var _              = require('underscore');
var viewModel      = require('view-model');

var CollectionView = require('../views/content-slide-collection-view');


//==============================================================================
// Constructor
//==============================================================================

var ContentSlidesController = function() {
  Controller.apply(this, arguments);
  this.collectionView = new CollectionView();
  this.$el = this.collectionView.$el;
  viewModel.on('ready:slideCollection', this._handleSlideCollectionReady, this);
};
var proto = ContentSlidesController.prototype;
$.extend(proto, Controller.prototype);


//==============================================================================
// Public functions
//==============================================================================

proto._handleSlideCollectionReady = function() {
  this.collectionView.setCollection(viewModel.get('slideCollection'));
  this.trigger('init');
};


//==============================================================================
// Export
//==============================================================================

module.exports = ContentSlidesController;

