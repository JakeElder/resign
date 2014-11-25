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
  this._rendered = false;
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
  if (!this._rendered) {
    this.$('.content-slide-collection__slide').each(function(idx) {
      $(this).css('top', (idx * 100) + '%' );
    });
    this._rendered = true;
    this._activeSlideIdx = 0;
  }
};

proto.render = function() {
  _.invoke(this.contentSlideViews, 'render');
  return this;
};

proto.showSlide = function(cID) {
  this.showSlideByIdx(this.idxFromCID(cID));
};

proto.showSlideByIdx = function(idx) {
  if (!this.$contentSlides[idx]) {
    throw 'No content slide at index: ' + idx;
  }
  var transform = 'translateZ(0) translateY(-' + (idx * 100) + '%)';
  this.$el.css('transform', transform);
  this._activeSlideIdx = idx;
};

proto.next = function() {
  this.showSlideByIdx(this._activeSlideIdx + 1);
};

proto.prev = function() {
  this.showSlideByIdx(this._activeSlideIdx - 1);
};

proto.idxFromCID = function(cID) {
  var idx = this.$contentSlides.filter('[data-cid="' + cID + '"]').index();
  if (idx === -1) { throw 'Invalid slide cID: ' + cID; }
  return idx;
};


//==============================================================================
// Private functions
//==============================================================================

proto._bindMethodContexts = function() {
  this._initContentSlideView  = _.bind(this._initContentSlideView, this);
  this._initContentSlideViews = _.bind(this._initContentSlideViews, this);
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


//==============================================================================
// Export
//==============================================================================

module.exports = ContentSlideCollectionView;

