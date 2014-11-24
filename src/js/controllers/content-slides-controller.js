//==============================================================================
// Dependencies
//==============================================================================

var Controller     = require('controller');
var Parse          = require('parse');
var $              = require('jquery');
var _              = require('underscore');

var CollectionView = require('../views/content-slide-collection-view');
var Collection     = require('../collections/content-slide-collection');
var Model          = require('../models/slide');


//==============================================================================
// Constructor
//==============================================================================

var ContentSlidesController = function() {
  Controller.apply(this, arguments);
  this._bindMethodContexts();
  this.collection = new Collection([], { query: this._getQuery() });
  this.collectionView = new CollectionView();
  this.$el = this.collectionView.$el;
  this.collection.fetch({ success: this._handleCollectionFetched });
};
$.extend(ContentSlidesController.prototype, Controller.prototype);


//==============================================================================
// Private functions
//==============================================================================

ContentSlidesController.prototype._bindMethodContexts = function() {
  this._handleCollectionFetched = _.bind(this._handleCollectionFetched, this);
};

ContentSlidesController.prototype._getQuery = function() {
  return new Parse.Query(Model)
    .matches('cID', this._getQueryRegex());
};

ContentSlidesController.prototype._getQueryRegex = function() {
  return /.*(LEASE).*/;
};

ContentSlidesController.prototype._handleCollectionFetched = function(collection) {
  this.collectionView.setCollection(collection);
  this.trigger('init');
};


//==============================================================================
// Export
//==============================================================================

module.exports = ContentSlidesController;

