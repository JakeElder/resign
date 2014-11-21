//==============================================================================
// Dependencies
//==============================================================================

var SlideView = require('./slide-view');
var Backbone  = require('backbone');
var _         = require('underscore');
var extend    = require('util')._extend;


//==============================================================================
// Constructor
//==============================================================================

var SlideCollectionView = function() {
  Backbone.View.apply(this, arguments);
  this._bindMethodContexts();
  this.collection.fetch({ success: this._initSlideViews });
};
extend(SlideCollectionView.prototype, Backbone.View.prototype);
SlideCollectionView.prototype.tagName = 'ul';


//==============================================================================
// Public functions
//==============================================================================

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

SlideCollectionView.prototype._initSlideViews = function() {
  this.slideViews = this.collection.map(this._initSlideView);
  this.trigger('init');
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

