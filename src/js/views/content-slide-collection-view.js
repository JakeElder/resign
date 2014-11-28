//==============================================================================
// Dependencies
//==============================================================================

var Backbone         = require('backbone');
var _                = require('underscore');
var $                = require('jquery');
var viewModel        = require('view-model');

var ContentSlideView = require('./content-slide-view');


//==============================================================================
// Constructor
//==============================================================================

var ContentSlideCollectionView = function() {
  Backbone.View.apply(this, arguments);
  this._bindMethodContexts();
  this._bindEventHandlers();
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
  this._setInitialState();
};

proto.render = function() {
  _.invoke(this.contentSlideViews, 'render');
  return this;
};

proto.showSlide = function(idx) {
  if (!this.$contentSlides[idx]) {
    throw 'No content slide at index: ' + idx;
  }
  var transform = 'translateZ(0) translateY(-' + (idx * 100) + '%)';
  this.$el.css('transform', transform);
};

proto.next = function() {
  viewModel.set('activeSlideIdx', viewModel.get('activeSlideIdx') + 1);
};

proto.prev = function() {
  viewModel.set('activeSlideIdx', viewModel.get('activeSlideIdx') - 1);
};


//==============================================================================
// Private functions
//==============================================================================

proto._bindMethodContexts = function() {
  this._initContentSlideView  = _.bind(this._initContentSlideView, this);
  this._initContentSlideViews = _.bind(this._initContentSlideViews, this);
};

proto._bindEventHandlers = function() {
  viewModel.on('change:activeSlideIdx', this._handleActiveSlideChange, this);
};

proto._initContentSlideViews = function(collection) {
  var slideViews = collection.map(this._initContentSlideView);
  this.$contentSlides = this.$el.children();
  return slideViews;
};

proto._initContentSlideView = function(model) {
  var contentSlideView = new ContentSlideView({ model: model });
  contentSlideView.$el.appendTo(this.$el);
  return contentSlideView;
};

proto._setInitialState = function() {
  this.$('.content-slide-collection__slide').each(function(idx) {
    $(this).css('top', (idx * 100) + '%' );
  });
};

proto._handleActiveSlideChange = function() {
  this.showSlide(viewModel.get('activeSlideIdx'));
};

//==============================================================================
// Export
//==============================================================================

module.exports = ContentSlideCollectionView;

