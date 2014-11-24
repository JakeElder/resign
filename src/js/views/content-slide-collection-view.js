//==============================================================================
// Dependencies
//==============================================================================

var Backbone         = require('backbone');
var _                = require('underscore');
var $                = require('jquery');

var ContentSlideView = require('./content-slide-view');


//==============================================================================
// Constructor
//==============================================================================

var ContentSlideCollectionView = function() {
  Backbone.View.apply(this, arguments);
  this._bindMethodContexts();
};
var proto = ContentSlideCollectionView.prototype;
$.extend(proto, Backbone.View.prototype, {
  tagName: 'ul',
  className: 'content-slide-collection'
});


//==============================================================================
// Public functions
//==============================================================================

proto.setCollection = function(collection) {
  this.contentSlideViews = this._initContentSlideViews(collection);
  this.render();
};

proto.render = function() {
  _.invoke(this.contentSlideViews, 'render');
  return this;
};


//==============================================================================
// Private functions
//==============================================================================

proto._bindMethodContexts = function() {
  this._initContentSlideView  = _.bind(this._initContentSlideView, this);
  this._initContentSlideViews = _.bind(this._initContentSlideViews, this);
};

proto._initContentSlideViews = function(collection) {
  return collection.map(this._initContentSlideView);
};

proto._initContentSlideView = function(model) {
  var contentSlideView = new ContentSlideView({ model: model });
  contentSlideView.$el.appendTo(this.$el);
  return contentSlideView;
};


//==============================================================================
// Export
//==============================================================================

module.exports = ContentSlideCollectionView;

