//==============================================================================
// Dependencies
//==============================================================================

var SlideView = require('./slide-view');
var Backbone  = require('backbone');
var _         = require('underscore');
var $         = require('jquery');


//==============================================================================
// Constructor
//==============================================================================

var SlideCollectionView = function() {
  Backbone.View.apply(this, arguments);
  this._bindMethodContexts();
};
$.extend(SlideCollectionView.prototype, Backbone.View.prototype, {
  tagName: 'ul'
});


//==============================================================================
// Public functions
//==============================================================================

SlideCollectionView.prototype.setCollection = function(collection) {
  this.slideViews = this._initSlideViews(collection);
  this.render();
};

SlideCollectionView.prototype.render = function() {
  _.invoke(this.slideViews, 'render');
  return this;
};


//==============================================================================
// Private functions
//==============================================================================

SlideCollectionView.prototype._bindMethodContexts = function() {
  this._initSlideView  = _.bind(this._initSlideView, this);
  this._initSlideViews = _.bind(this._initSlideViews, this);
};

SlideCollectionView.prototype._initSlideViews = function(collection) {
  return collection.map(this._initSlideView);
};

SlideCollectionView.prototype._initSlideView = function(model) {
  var slideView = new SlideView({ model: model });
  slideView.$el.appendTo(this.$el);
  return slideView;
};


//==============================================================================
// Export
//==============================================================================

module.exports = SlideCollectionView;

