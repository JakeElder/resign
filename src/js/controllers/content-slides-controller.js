//==============================================================================
// Dependencies
//==============================================================================

var Controller     = require('controller');
var $              = require('jquery');
var _              = require('underscore');

var CollectionView = require('../views/content-slide-collection-view');


//==============================================================================
// Constructor
//==============================================================================

var ContentSlidesController = function() {
  Controller.apply(this, arguments);
  this.collectionView = new CollectionView();
  this.$el = this.collectionView.$el;
};
$.extend(ContentSlidesController.prototype, Controller.prototype);


//==============================================================================
// Public functions
//==============================================================================

ContentSlidesController.prototype.setCollection = function(collection) {
  this.collectionView.setCollection(collection);
  this.trigger('init');
};


//==============================================================================
// Export
//==============================================================================

module.exports = ContentSlidesController;

